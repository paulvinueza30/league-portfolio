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

func Handler(w http.ResponseWriter, r *http.Request) {
	appConfig := config.GetApp().Config
	targetURL := appConfig.SelfHostedBackendURL

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

	proxy.Director = func(req *http.Request) {
		req.URL.Host = remote.Host
		req.URL.Scheme = remote.Scheme
		req.Host = remote.Host
		req.URL.Path = strings.TrimPrefix(req.URL.Path, "/api")
	}

	proxy.ErrorHandler = func(rw http.ResponseWriter, req *http.Request, err error) {
		log.Printf("Proxy to self-hosted backend failed: %v. Initiating fallback.", err)
		fallback(rw, req)
	}

	proxy.ModifyResponse = func(resp *http.Response) error {
		if resp.StatusCode >= 500 {
			log.Printf("Self-hosted backend returned status %s. Initiating fallback.", resp.Status)
			resp.Body.Close()
			return fmt.Errorf("bad response from self-hosted backend: %s", resp.Status)
		}
		return nil
	}

	log.Printf("Proxying request to: %s%s", remote, r.URL.Path) // r.URL.Path is original here
	proxy.ServeHTTP(w, r)
}

func fallback(w http.ResponseWriter, r *http.Request) {
	log.Println("Executing fallback logic: internal Gin router.")
	if !strings.HasPrefix(r.URL.Path, "/api") {
		r.URL.Path = "/api" + r.URL.Path
	}
	api.GetRouter().ServeHTTP(w, r)
}
