package models

import "time"

type ApiResponse[T any] struct {
	Data      T
	Timestamp time.Time
}
type ApiDetails struct {
	RedisKey   string
	StaleAfter time.Duration
	FetchFn    func() (any, error)
}
