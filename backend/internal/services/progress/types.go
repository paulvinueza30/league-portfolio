package progress

import (
	"time"
)

type ProgressResponse struct {
	Data      any    `json:"data,omitempty"`
	Timestamp int64  `json:"timestamp,omitempty"`
	Source    string `json:"source,omitempty"` // "store", "live", or "backup"
}

type ApiDetails struct {
	RedisKey   string
	StaleAfter time.Duration
	FetchFn    func() (any, error)
}
