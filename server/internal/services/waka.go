package services

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/paulvinueza30/league-portfolio/api/internal/config"
	"github.com/paulvinueza30/league-portfolio/api/internal/models"
)

type wakaService struct {
	apiKey   string
	username string
}

func newWakaService(cfg *config.ProgressConfig) *wakaService {
	return &wakaService{
		apiKey:   cfg.WakaAPIKey,
		username: "paulvinueza30",
	}
}

func (s *wakaService) getDetails() *models.ApiDetails {
	return &models.ApiDetails{
		RedisKey:   "waka-progress",
		StaleAfter: time.Minute * 30,
		FetchFn:    s.fetch,
	}
}

func (s *wakaService) fetch() (any, error) {
	now := time.Now()
	start := now.AddDate(0, 0, -7).Format("2006/01/02")
	end := now.Format("2006/01/02")

	url := fmt.Sprintf("https://wakatime.com/api/v1/users/%s/summaries?start=%s&end=%s&api_key=%s",
		s.username, start, end, s.apiKey)

	var rawResponse map[string]any
	err := s.request(url, &rawResponse)
	if err != nil {
		return nil, err
	}

	return s.extractData(rawResponse, start, end)
}

func (s *wakaService) request(url string, target any) error {
	resp, err := http.Get(url)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("wakatime api error: %d", resp.StatusCode)
	}

	return json.NewDecoder(resp.Body).Decode(target)
}

func (s *wakaService) extractData(summary map[string]any, start string, end string) (any, error) {
	// Extract Totals with defaults
	cumTotal := "0 secs"
	if ct, ok := summary["cumulative_total"].(map[string]any); ok {
		cumTotal, _ = ct["text"].(string)
	}

	dailyAvg := "0 secs"
	if da, ok := summary["daily_average"].(map[string]any); ok {
		dailyAvg, _ = da["text"].(string)
	}

	// Find the first day in the range that has actual coding time
	var summaryData map[string]any
	if dataList, ok := summary["data"].([]any); ok {
		for _, d := range dataList {
			item := d.(map[string]any)
			if gt, ok := item["grand_total"].(map[string]any); ok {
				if mins, ok := gt["minutes"].(float64); ok && mins > 1 {
					summaryData = item
					break
				}
			}
		}
	}

	// Helper to extract top stats safely
	getTop := func(category string) (string, string, float64) {
		if summaryData != nil {
			if items, ok := summaryData[category].([]any); ok && len(items) > 0 {
				first := items[0].(map[string]any)
				name, _ := first["name"].(string)
				text, _ := first["text"].(string)
				percent, _ := first["percent"].(float64)
				return name, text, percent
			}
		}
		return "N/A", "0 mins", 0
	}

	langName, langTime, langPct := getTop("languages")
	projName, projTime, projPct := getTop("projects")
	editorName, _, _ := getTop("editors")
	osName, _, _ := getTop("operating_systems")

	return map[string]any{
		"cumTotal":           cumTotal,
		"dailyAverage":       dailyAvg,
		"topLanguange":       langName,
		"topLanguageTime":    langTime,
		"topLanguagePercent": langPct,
		"topProject":         projName,
		"topProjectTime":     projTime,
		"topProjectPercent":  projPct,
		"editorUsed":         editorName,
		"osUsed":             osName,
		"start":              start,
		"end":                end,
	}, nil
}
