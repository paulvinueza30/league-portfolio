package services

import (
	"encoding/json"
	"fmt"
	"os"
	"sort"
	"strings"
)

type Project struct {
	ID          int      `json:"id"`
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
	projectsDir := "../data/projects"

	dirs, err := os.ReadDir(projectsDir)
	if err != nil {
		return nil, fmt.Errorf("failed to read projects directory: %w", err)
	}

	// Read order from projects_order.txt if exists
	orderFile := "../data/projects_order.txt"
	var orderedSlugs []string
	if data, err := os.ReadFile(orderFile); err == nil {
		lines := strings.Split(strings.TrimSpace(string(data)), "\n")
		for _, line := range lines {
			line = strings.TrimSpace(line)
			if line != "" {
				orderedSlugs = append(orderedSlugs, line)
			}
		}
	}

	// Create a map for quick lookup
	projectMap := make(map[string]Project)
	var allSlugs []string
	for _, dir := range dirs {
		if !dir.IsDir() {
			continue
		}
		slug := dir.Name()
		project, err := GetProject(slug)
		if err != nil {
			continue
		}
		projectMap[slug] = *project
		allSlugs = append(allSlugs, slug)
	}

	// Build ordered projects
	var projects []Project
	for _, slug := range orderedSlugs {
		if project, exists := projectMap[slug]; exists {
			projects = append(projects, project)
			delete(projectMap, slug)
		}
	}

	// Add remaining projects not in order file, sorted alphabetically
	var remaining []string
	for slug := range projectMap {
		remaining = append(remaining, slug)
	}
	sort.Strings(remaining)
	for _, slug := range remaining {
		projects = append(projects, projectMap[slug])
	}

	// Assign IDs
	for i := range projects {
		projects[i].ID = i + 1
	}

	return projects, nil
}

func GetProject(slug string) (*Project, error) {
	projectPath := fmt.Sprintf("../data/projects/%s/project.json", slug)
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

func GetProjectByID(id int) (*Project, error) {
	projects, err := GetAllProjects()
	if err != nil {
		return nil, fmt.Errorf("failed to get all projects: %w", err)
	}

	for _, project := range projects {
		if project.ID == id {
			return &project, nil
		}
	}

	return nil, fmt.Errorf("project with id %d not found", id)
}
