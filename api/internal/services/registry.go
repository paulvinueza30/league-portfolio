package services

import (
	"fmt"
	"maps"
	"slices"

	"github.com/paulvinueza30/league-portfolio/api/internal/config"
	"github.com/paulvinueza30/league-portfolio/api/internal/models"
)

type Registry struct {
	github   *githubService
	riot     *riotService
	waka     *wakaService
	leetcode *leetcodeService
	anki     *ankiService
}

func NewRegistry(cfg *config.ProgressConfig) *Registry {
	return &Registry{
		github:   newGithubService(),
		riot:     newRiotService(cfg),
		waka:     newWakaService(cfg),
		leetcode: newLeetcodeService(cfg),
		anki:     newAnkiService(),
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

func (r *Registry) GetProgress() {
	registry := r.getRegistry()
	for source, details := range registry {
		fmt.Println("fetching details for %s...", source)
		_ = details
	}
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
