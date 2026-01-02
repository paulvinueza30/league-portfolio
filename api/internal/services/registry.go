package services

import (
	"fmt"

	"github.com/paulvinueza30/league-portfolio/api/internal/models"
)

var registry = map[string]*models.ApiDetails{
	"github": getGithubDetails(),
}

func GetProgress() {
	for source, details := range registry {
		fmt.Println("fetching details for %s...", source)
		_ = details
	}
}

func GetSource(source string) *models.ApiDetails {
	return registry[source]
}

func ListSources() []string {
	sources := make([]string, 0, len(registry))
	for source := range registry {
		sources = append(sources, source)
	}
	return sources
}

func TestSource(source string) (any, error) {
	details := GetSource(source)
	if details == nil {
		return nil, fmt.Errorf("source '%s' not found in registry", source)
	}
	return details.FetchFn()
}
