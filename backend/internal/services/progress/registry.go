// Package services is responsible for holding fetch logic for each api
package progress

import (
	"context"
	"encoding/json"
	"fmt"
	"maps"
	"slices"
	"time"

	"github.com/paulvinueza30/league-portfolio/backend/internal/config"
	"github.com/redis/go-redis/v9"
)

func init() {
	config.SetRegistryFactory(func(cfg *config.ProgressConfig, rdb *redis.Client) interface{} {
		return NewRegistry(cfg, rdb)
	})
}

type Registry struct {
	github   *githubService
	riot     *riotService
	waka     *wakaService
	leetcode *leetcodeService
	anki     *ankiService

	rdb *redis.Client
	ctx context.Context
}

func NewRegistry(cfg *config.ProgressConfig, rdb *redis.Client) *Registry {
	return &Registry{
		github:   newGithubService(),
		riot:     newRiotService(cfg),
		waka:     newWakaService(cfg),
		leetcode: newLeetcodeService(cfg),
		anki:     newAnkiService(),

		rdb: rdb,
		ctx: context.Background(),
	}
}

func (r *Registry) getRegistry() map[string]*ApiDetails {
	return map[string]*ApiDetails{
		"github":   r.github.getDetails(),
		"riot":     r.riot.getDetails(),
		"waka":     r.waka.getDetails(),
		"leetcode": r.leetcode.getDetails(),
		"anki":     r.anki.getDetails(),
	}
}

func (r *Registry) GetProgress(key string) (*ProgressResponse, error) {
	if key == "" {
		return nil, fmt.Errorf("key is required")
	}

	details := r.getSource(key)
	if details == nil {
		return nil, fmt.Errorf("unknown API key: %s", key)
	}

	return r.get(key, details)
}

func (r *Registry) get(source string, details *ApiDetails) (*ProgressResponse, error) {
	now := time.Now().UnixMilli()

	var cached *ProgressResponse

	cachedData, err := r.rdb.Get(r.ctx, details.RedisKey).Result()
	if err == nil && cachedData != "" {
		if err := json.Unmarshal([]byte(cachedData), &cached); err == nil {
			cached.Source = "store"
			return cached, nil
		} else {
			var oldData any
			if json.Unmarshal([]byte(cachedData), &oldData) == nil {
				cached = &ProgressResponse{
					Data:      oldData,
					Timestamp: 0,
				}
			}
		}
	}

	fmt.Printf("Cache miss for %s, fetching fresh data...\n", source)
	data, err := details.FetchFn()
	if err != nil {
		if cached != nil {
			fmt.Printf("Fetch failed for %s, returning stale cached data as backup\n", source)
			cached.Source = "backup"
			return cached, nil
		}
		return nil, fmt.Errorf("failed to fetch and no cache available")
	}

	response := &ProgressResponse{
		Data:      data,
		Timestamp: now,
		Source:    "live",
	}
	marshaled, _ := json.Marshal(response)
	err = r.rdb.Set(r.ctx, details.RedisKey, marshaled, details.StaleAfter).Err()
	if err != nil {
		fmt.Printf("Failed to cache data for %s: %v\n", source, err)
	}

	return response, nil
}

func (r *Registry) ListSources() []string {
	registry := r.getRegistry()
	k := maps.Keys(registry)
	return slices.Collect(k)
}

func (r *Registry) getSource(source string) *ApiDetails {
	registry := r.getRegistry()
	return registry[source]
}
