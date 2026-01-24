package progress

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/dustin/go-humanize"
	"github.com/paulvinueza30/league-portfolio/backend/internal/config"
)

type leetcodeService struct {
	session  string
	username string
	apiUrl   string
}

func newLeetcodeService(cfg *config.ProgressConfig) *leetcodeService {
	return &leetcodeService{
		session:  cfg.LeetcodeSession,
		username: cfg.LeetcodeUsername,
		apiUrl:   "https://leetcode.com/graphql",
	}
}

func (s *leetcodeService) getDetails() *ApiDetails {
	return &ApiDetails{
		RedisKey:   "leetcode_cache",
		StaleAfter: time.Minute * 5,
		FetchFn:    s.fetch,
	}
}

func (s *leetcodeService) fetch() (any, error) {
	if s.session == "" || s.username == "" {
		return map[string]any{"submissions": []any{}}, nil
	}

	query := `query recentSubmissions($username: String!, $limit: Int!) {
      recentSubmissionList(username: $username, limit: $limit) {
        title
        titleSlug
        statusDisplay
        lang
        timestamp
      }
    }`

	variables := map[string]any{
		"username": s.username,
		"limit":    10,
	}

	body := map[string]any{
		"query":     query,
		"variables": variables,
	}

	var rawResponse map[string]any
	err := s.request(body, &rawResponse)
	if err != nil {
		return nil, err
	}

	return s.extractData(rawResponse)
}

func (s *leetcodeService) request(body any, target any) error {
	jsonBody, _ := json.Marshal(body)
	req, err := http.NewRequest("POST", s.apiUrl, bytes.NewBuffer(jsonBody))
	if err != nil {
		return err
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Referer", "https://leetcode.com/")
	req.Header.Set("User-Agent", "Mozilla/5.0")
	req.Header.Set("Cookie", fmt.Sprintf("LEETCODE_SESSION=%s", s.session))

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("leetcode api error: %d", resp.StatusCode)
	}

	return json.NewDecoder(resp.Body).Decode(target)
}

func (s *leetcodeService) extractData(raw map[string]any) (any, error) {
	data, ok := raw["data"].(map[string]any)
	if !ok {
		return map[string]any{"submissions": []any{}}, nil
	}

	items, ok := data["recentSubmissionList"].([]any)
	if !ok {
		return map[string]any{"submissions": []any{}}, nil
	}

	submissions := make([]map[string]any, 0)

	for _, item := range items {
		sMap := item.(map[string]any)

		title, _ := sMap["title"].(string)
		slug, _ := sMap["titleSlug"].(string)
		lang, _ := sMap["lang"].(string)
		status, _ := sMap["statusDisplay"].(string)

		// Handle Timestamp conversion
		var relativeTime string = "Unknown"
		if tsStr, ok := sMap["timestamp"].(string); ok {
			tsInt, _ := strconv.ParseInt(tsStr, 10, 64)
			relativeTime = humanize.Time(time.Unix(tsInt, 0))
		}

		submissions = append(submissions, map[string]any{
			"title":        title,
			"problemLink":  fmt.Sprintf("https://leetcode.com/problems/%s/", slug),
			"solutionLink": fmt.Sprintf("https://leetcode.com/problems/%s/submissions/", slug), // GraphQL doesn't always provide URL
			"relativeTime": relativeTime,
			"lang":         lang,
			"status":       status,
		})
	}

	return map[string]any{"submissions": submissions}, nil
}
