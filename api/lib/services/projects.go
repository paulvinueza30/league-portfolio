package services

import (
	"encoding/json"
	"fmt"
	"os"
)

type Project struct {
	Slug        string   `json:"slug"`
	Title       string   `json:"title"`
	Date        string   `json:"date"`
	Tech        []string `json:"tech"`
	GithubURL   string   `json:"github_url,omitempty"`
	BlogURL     string   `json:"blog_url,omitempty"`
	Featured    bool     `json:"featured"`
	Description string   `json:"description"`
	HeroImage   string   `json:"hero_image,omitempty"`
	DemoVideo   string   `json:"demo_video,omitempty"`
}

func GetAllProjects() ([]Project, error) {
	projectsDir := "api/projects"

	// Define order: hyprtask, tiny, lib bot, then others
	order := []string{"hyprtask", "tinyautomator", "library-reservation-bot"}

	var orderedProjects []Project
	var remainingProjects []Project

	dirs, err := os.ReadDir(projectsDir)
	if err != nil {
		return nil, fmt.Errorf("failed to read projects directory: %w", err)
	}

	// First pass: get ordered projects
	for _, slug := range order {
		for _, dir := range dirs {
			if !dir.IsDir() || dir.Name() != slug {
				continue
			}

			project, err := GetProject(slug)
			if err != nil {
				continue
			}

			orderedProjects = append(orderedProjects, *project)
			break
		}
	}

	// Second pass: get remaining projects
	for _, dir := range dirs {
		if !dir.IsDir() {
			continue
		}

		slug := dir.Name()
		isOrdered := false
		for _, orderedSlug := range order {
			if slug == orderedSlug {
				isOrdered = true
				break
			}
		}

		if !isOrdered {
			project, err := GetProject(slug)
			if err != nil {
				continue
			}

			remainingProjects = append(remainingProjects, *project)
		}
	}

	// Combine ordered + remaining
	allProjects := append(orderedProjects, remainingProjects...)
	return allProjects, nil
}

func GetProject(slug string) (*Project, error) {
	projectPath := fmt.Sprintf("api/projects/%s/project.json", slug)
	data, err := os.ReadFile(projectPath)
	if err != nil {
		return nil, fmt.Errorf("failed to read project file: %w", err)
	}

	var project Project
	if err := json.Unmarshal(data, &project); err != nil {
		return nil, fmt.Errorf("failed to parse project JSON: %w", err)
	}

	project.Slug = slug
	return &project, nil
}
