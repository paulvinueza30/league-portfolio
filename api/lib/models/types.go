package models

import (
	"time"
)

type ProgressResponse struct {
	Data      any    `json:"data,omitempty"`
	Timestamp int64  `json:"timestamp,omitempty"`
	Source    string `json:"source,omitempty"` // "store", "live", or "backup"
}

type ProjectsResponse struct {
	Data      []Project `json:"data,omitempty"`
	Timestamp int64     `json:"timestamp,omitempty"`
	Source    string    `json:"source,omitempty"` // "store", "live", or "backup"
}

type ApiDetails struct {
	RedisKey   string
	StaleAfter time.Duration
	FetchFn    func() (any, error)
}

type Project struct {
	ID          int      `json:"id"`
	Title       string   `json:"title"`
	Description string   `json:"description"`
	ImageURL    string   `json:"image_url"`
	DemoURL     string   `json:"demo_url,omitempty"`
	SourceURL   string   `json:"source_url,omitempty"`
	BlogURL     string   `json:"blog_url,omitempty"`
	Date        string   `json:"date,omitempty"`
	Tech        []string `json:"tech,omitempty"`
	Featured    bool     `json:"featured,omitempty"`
}

type PostsResponse struct {
	Data      []Post `json:"data,omitempty"`
	Timestamp int64  `json:"timestamp,omitempty"`
	Source    string `json:"source,omitempty"`
}

type Post struct {
	ID        int       `json:"id"`
	Title     string    `json:"title"`
	Content   string    `json:"content"`
	ImageURL  string    `json:"image_url"`
	CreatedAt time.Time `json:"created_at,omitempty"`
}
