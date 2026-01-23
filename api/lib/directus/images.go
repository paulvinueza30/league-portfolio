package directus

import (
	"fmt"
	"io"
	"net/http"
)

func (c *Client) ProxyImage(w http.ResponseWriter, r *http.Request, fileID string) error {
	url := fmt.Sprintf("%s/assets/%s", c.baseURL, fileID)
	
	req, err := http.NewRequestWithContext(r.Context(), "GET", url, nil)
	if err != nil {
		return fmt.Errorf("failed to create request: %w", err)
	}

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return fmt.Errorf("failed to fetch image: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		http.Error(w, "Failed to fetch image", resp.StatusCode)
		return nil
	}

	for key, values := range resp.Header {
		for _, value := range values {
			w.Header().Add(key, value)
		}
	}

	w.WriteHeader(resp.StatusCode)

	_, err = io.Copy(w, resp.Body)
	if err != nil {
		return fmt.Errorf("failed to stream image: %w", err)
	}

	return nil
}

