package services

import (
	"time"

	"github.com/paulvinueza30/league-portfolio/api/internal/models"
)

type ankiService struct{}

func newAnkiService() *ankiService {
	return &ankiService{}
}

func (s *ankiService) getDetails() *models.ApiDetails {
	return &models.ApiDetails{
		RedisKey:   "anki_cahce",
		StaleAfter: time.Hour * 24 * 365 * 10, // 10 Years :)
		FetchFn:    s.fetch,
	}
}

func (s *ankiService) fetch() (any, error) {
	return nil, nil
}
