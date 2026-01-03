// Package services is responsible for holding fetch logic for each api
package services

import (
	"context"
	"encoding/json"
	"fmt"
	"maps"
	"slices"

	"github.com/paulvinueza30/league-portfolio/api/internal/config"
	"github.com/paulvinueza30/league-portfolio/api/internal/models"
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

func (r *Registry) getRegistry() map[string]*models.ApiDetails {
	return map[string]*models.ApiDetails{
		"github":   r.github.getDetails(),
		"riot":     r.riot.getDetails(),
		"waka":     r.waka.getDetails(),
		"leetcode": r.leetcode.getDetails(),
		"anki":     r.anki.getDetails(),
	}
}

func (r *Registry) GetProgress() (map[string]any, error) {
	registry := r.getRegistry()

	res := make(map[string]any)
	for source := range registry {
		data, err := r.get(source)
		if err != nil {
			fmt.Printf("error: couldnt get data for %s: %v\n", source, err)
			continue
		}
		res[source] = data
	}
	return res, nil
}

func (r *Registry) get(source string) (any, error) {
	details := r.GetSource(source)
	if details == nil {
		return nil, fmt.Errorf("source '%s' not found", source)
	}

	cachedData, err := r.rdb.Get(r.ctx, details.RedisKey).Result()
	if err == nil {
		var result any
		if err := json.Unmarshal([]byte(cachedData), &result); err == nil {
			return result, nil
		}
	}

	fmt.Printf("Cache miss or error for %s, fetching fresh data...\n", source)
	data, err := details.FetchFn()
	if err != nil {
		if cachedData != "" {
			var cachedResult any
			if json.Unmarshal([]byte(cachedData), &cachedResult) == nil {
				fmt.Printf("Fetch failed for %s, returning stale cached data as backup\n", source)
				return cachedResult, nil
			}
		}
		return nil, err
	}

	marshaled, _ := json.Marshal(data)
	err = r.rdb.Set(r.ctx, details.RedisKey, marshaled, details.StaleAfter).Err()
	if err != nil {
		fmt.Printf("Failed to cache data for %s: %v\n", source, err)
	}

	return data, nil
}

func (r *Registry) ListSources() []string {
	registry := r.getRegistry()
	k := maps.Keys(registry)
	return slices.Collect(k)
}

func (r *Registry) GetSource(source string) *models.ApiDetails {
	registry := r.getRegistry()
	return registry[source]
}

func (r *Registry) TestSource(source string) (any, error) {
	details := r.GetSource(source)
	if details == nil {
		return nil, fmt.Errorf("source '%s' not found in registry", source)
	}
	return details.FetchFn()
}
