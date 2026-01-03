package models

import (
	"time"
)

type ApiResponse[T any] struct {
	Data      T         `json:"data"`
	Timestamp time.Time `json:"timestamp"`
}
type ApiDetails struct {
	RedisKey   string
	StaleAfter time.Duration
	FetchFn    func() (any, error)
}
