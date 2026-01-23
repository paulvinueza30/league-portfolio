package directus

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"
)

type Client struct {
	baseURL    string
	httpClient *http.Client
}

func (c *Client) AssetProxyPath(fileID string) string {
	if fileID == "" {
		return ""
	}
	return "/api/assets/" + fileID
}

type CollectionResponse struct {
	Data []map[string]interface{} `json:"data"`
}

func NewClient(baseURL string) *Client {
	if baseURL == "" {
		baseURL = "http://localhost:8055"
	}
	return &Client{
		baseURL: baseURL,
		httpClient: &http.Client{
			Timeout: 10 * time.Second,
		},
	}
}

func (c *Client) GetCollection(collection string) ([]map[string]interface{}, error) {
	url := fmt.Sprintf("%s/items/%s", c.baseURL, collection)

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch collection from %s: %w", url, err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("directus returned status %d for %s: %s", resp.StatusCode, url, string(body))
	}

	var collectionResp CollectionResponse
	if err := json.NewDecoder(resp.Body).Decode(&collectionResp); err != nil {
		return nil, fmt.Errorf("failed to decode response from %s: %w", url, err)
	}

	return collectionResp.Data, nil
}

func (c *Client) TestConnection() error {
	url := fmt.Sprintf("%s/server/info", c.baseURL)

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return fmt.Errorf("failed to create test request: %w", err)
	}

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return fmt.Errorf("connection refused - cannot reach Directus at %s: %w", c.baseURL, err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("Directus returned status %d", resp.StatusCode)
	}

	return nil
}
