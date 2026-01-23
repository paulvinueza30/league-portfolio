package services

import "time"

type ApiDetails struct {
	RedisKey   string
	StaleAfter time.Duration
	FetchFn    func() (any, error)
}
