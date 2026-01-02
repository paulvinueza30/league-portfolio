package services

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/dustin/go-humanize"
	"github.com/paulvinueza30/league-portfolio/api/internal/config"
	"github.com/paulvinueza30/league-portfolio/api/internal/models"
)

type riotService struct {
	apiKey   string
	puuid    string
	americas string
	na1      string
	ddragon  string
}

func newRiotService(cfg *config.ProgressConfig) *riotService {
	return &riotService{
		apiKey:   cfg.RiotAPIKey,
		puuid:    "nhFsuZBKVP5go-OZQleZE_2r-k2NTQacmxNsndkA1TxoGJyI8y00TEqHvax3PYbcEzW4s62hQK9hZQ",
		americas: "https://americas.api.riotgames.com",
		na1:      "https://na1.api.riotgames.com",
		ddragon:  "https://ddragon.leagueoflegends.com",
	}
}

func (s *riotService) getDetails() *models.ApiDetails {
	return &models.ApiDetails{
		RedisKey:   "riot-progress",
		StaleAfter: time.Minute * 30,
		FetchFn:    s.fetch,
	}
}

func (s *riotService) fetch() (any, error) {
	matchIds, err := s.getMatchIds()
	if err != nil || len(matchIds) == 0 {
		return nil, err
	}

	match, err := s.getMatch(matchIds[0])
	if err != nil {
		return nil, err
	}

	leagueEntries, err := s.getLeagueEntries()
	if err != nil || len(leagueEntries) == 0 {
		return nil, err
	}

	latestVersion, err := s.getLatestVersion()
	if err != nil {
		return nil, err
	}

	return s.extractData(match, leagueEntries[0], latestVersion)
}

func (s *riotService) getMatchIds() ([]string, error) {
	url := fmt.Sprintf("%s/lol/match/v5/matches/by-puuid/%s/ids?type=ranked&count=1", s.americas, s.puuid)
	var ids []string
	err := s.request(url, &ids)
	return ids, err
}

func (s *riotService) getMatch(id string) (map[string]any, error) {
	url := fmt.Sprintf("%s/lol/match/v5/matches/%s", s.americas, id)
	var match map[string]any
	err := s.request(url, &match)
	return match, err
}

func (s *riotService) getLeagueEntries() ([]map[string]any, error) {
	url := fmt.Sprintf("%s/lol/league/v4/entries/by-puuid/%s", s.na1, s.puuid)
	var entries []map[string]any
	err := s.request(url, &entries)
	return entries, err
}

func (s *riotService) getLatestVersion() (string, error) {
	url := fmt.Sprintf("%s/api/versions.json", s.ddragon)
	var versions []string
	err := s.request(url, &versions)
	if err != nil || len(versions) == 0 {
		return "", err
	}
	return versions[0], nil
}

func (s *riotService) request(url string, target any) error {
	req, _ := http.NewRequest("GET", url, nil)
	req.Header.Set("X-Riot-Token", s.apiKey)
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	return json.NewDecoder(resp.Body).Decode(target)
}

func (s *riotService) extractData(match map[string]any, league map[string]any, version string) (any, error) {
	info := match["info"].(map[string]any)
	participants := info["participants"].([]any)

	var p map[string]any
	for _, part := range participants {
		item := part.(map[string]any)
		if item["puuid"] == s.puuid {
			p = item
			break
		}
	}

	if p == nil {
		return nil, fmt.Errorf("player not found")
	}

	tier := strings.ToLower(league["tier"].(string))
	gameCreation := int64(info["gameCreation"].(float64))

	nexusTakedowns := 0.0
	if val, ok := p["nexusTakedowns"].(float64); ok {
		nexusTakedowns = val
	}

	return map[string]any{
		"summonerName: ": fmt.Sprintf("%v#%v", p["riotIdGameName"], p["riotIdTagline"]),
		"profileIcon":    fmt.Sprintf("%s/cdn/%s/img/profileicon/%v.png", s.ddragon, version, p["profileIcon"]),
		"relativeTime":   humanize.Time(time.Unix(gameCreation/1000, 0)),
		"position":       p["individualPosition"],
		"champName":      p["championName"],
		"champImg":       fmt.Sprintf("%s/cdn/%s/img/champion/%v.png", s.ddragon, version, p["championName"]),
		"kills":          p["kills"],
		"deaths":         p["deaths"],
		"assists":        p["assists"],
		"win":            p["win"],
		"plus50":         nexusTakedowns > 0,
		"rankInfo": map[string]any{
			"leaguePoints: ": league["leaguePoints"],
			"hotStreak":      league["hotStreak"],
			"tier":           league["tier"],
			"rank":           league["rank"],
			"rankImg":        fmt.Sprintf("https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-%s.png", tier),
			"wins":           league["wins"],
			"losses":         league["losses"],
		},
	}, nil
}
