package handler

import (
	"fmt"
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
	"strings"

	"github.com/paulvinueza30/league-portfolio/api/lib/api"
	"github.com/paulvinueza30/league-portfolio/api/lib/config"
)

// Handler is the main Vercel entrypoint. It acts as a reverse proxy with a fallback.
// It will attempt to proxy the request to the self-hosted backend. If the proxy attempt
// fails (due to a network error or a 5xx response from the backend), it will
// fall back to using its own internal Gin router.
func Handler(w http.ResponseWriter, r *http.Request) {
	appConfig := config.GetApp().Config
	targetURL := appConfig.SelfHostedBackendURL

	// If SELF_HOSTED_BACKEND_URL is not configured, go directly to the fallback.
	// This allows the Vercel function to still work as a standalone backend.
	if targetURL == "" {
		log.Println("WARN: SELF_HOSTED_BACKEND_URL is not set. Running in fallback-only mode.")
		fallback(w, r)
		return
	}

	remote, err := url.Parse(targetURL)
	if err != nil {
		log.Printf("FATAL: Could not parse SELF_HOSTED_BACKEND_URL: %v", err)
		http.Error(w, "Internal Server Error: Invalid backend URL configuration.", http.StatusInternalServerError)
		return
	}

	proxy := httputil.NewSingleHostReverseProxy(remote)

	// Set a custom ErrorHandler that triggers the fallback logic.
	proxy.ErrorHandler = func(rw http.ResponseWriter, req *http.Request, err error) {
		log.Printf("Proxy to self-hosted backend failed: %v. Initiating fallback.", err)
		fallback(rw, req)
	}

	// Set a custom ModifyResponse function to check the backend's response.
	// If the backend returns a server error (5xx), we also trigger the fallback.
	proxy.ModifyResponse = func(resp *http.Response) error {
		if resp.StatusCode >= 500 {
			log.Printf("Self-hosted backend returned status %s. Initiating fallback.", resp.Status)
			// By returning an error, we signal to the proxy's ErrorHandler to run.
			// We must also close the response body to avoid leaking connections.
			resp.Body.Close()
			return fmt.Errorf("bad response from self-hosted backend: %s", resp.Status)
		}
		// A nil return means the response is good and should be passed through.
		return nil
	}

	// The request path on Vercel is /api/... but the target self-hosted server
	// and the internal fallback router both expect paths like /...
	// We must trim this prefix from the request before proxying or falling back.
	r.URL.Path = strings.TrimPrefix(r.URL.Path, "/api")

	log.Printf("Proxying request to: %s%s", remote, r.URL.Path)
	proxy.ServeHTTP(w, r)
}

// fallback executes the internal Gin router logic. This code runs when the
// primary self-hosted server is unavailable.
func fallback(w http.ResponseWriter, r *http.Request) {
	log.Println("Executing fallback logic: internal Gin router.")
	// The request 'r' might not have its prefix trimmed if it came here directly,
	// so we ensure it's trimmed before passing it to the Gin router.
	r.URL.Path = strings.TrimPrefix(r.URL.Path, "/api")
	api.GetRouter().ServeHTTP(w, r)
}
