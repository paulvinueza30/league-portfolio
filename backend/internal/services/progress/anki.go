package progress

import (
	"time"

)

type ankiService struct{}

func newAnkiService() *ankiService {
	return &ankiService{}
}

func (s *ankiService) getDetails() *ApiDetails {
	return &ApiDetails{
		RedisKey:   "anki_cache",
		StaleAfter: time.Hour * 24 * 365 * 10, // 10 Years :)
		FetchFn:    s.fetch,
	}
}

func (s *ankiService) fetch() (any, error) {
	return nil, nil
}
