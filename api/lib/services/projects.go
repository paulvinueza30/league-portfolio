package services

import (
	"fmt"
	"log"
	"strconv"
	"strings"

	"github.com/paulvinueza30/league-portfolio/api/lib/directus"
	"github.com/paulvinueza30/league-portfolio/api/lib/models"
)

type ProjectService struct {
	client *directus.Client
}

func NewProjectService(client *directus.Client) *ProjectService {
	return &ProjectService{
		client: client,
	}
}

func (s *ProjectService) FetchProjects() ([]models.Project, error) {
	data, err := s.client.GetCollection("projects")
	if err != nil {
		log.Printf("Error fetching projects from Directus: %v", err)
		return nil, err
	}

	var projects []models.Project
	for _, item := range data {
		project, err := s.mapToProject(item)
		if err != nil {
			log.Printf("Error mapping project: %v", err)
			continue
		}
		projects = append(projects, project)
	}

	return projects, nil
}

func (s *ProjectService) mapToProject(item map[string]interface{}) (models.Project, error) {
	var p models.Project

	if id, ok := item["id"].(float64); ok {
		p.ID = int(id)
	} else if idStr, ok := item["id"].(string); ok {
		id, err := strconv.Atoi(idStr)
		if err != nil {
			return p, fmt.Errorf("invalid id: %v", item["id"])
		}
		p.ID = id
	}

	if title, ok := item["title"].(string); ok {
		p.Title = title
	}

	if desc, ok := item["description"].(string); ok {
		p.Description = desc
	}

	if imgURL, ok := item["img_url"].(string); ok && imgURL != "" {
		if strings.HasPrefix(imgURL, "http") {
			p.ImageURL = imgURL
		} else {
			p.ImageURL = s.client.AssetProxyPath(imgURL)
		}
	}

	if demoURL, ok := item["demo_url"].(string); ok && demoURL != "" {
		if strings.HasPrefix(demoURL, "http") {
			p.DemoURL = demoURL
		} else {
			p.DemoURL = s.client.AssetProxyPath(demoURL)
		}
	}

	if sourceURL, ok := item["source_url"].(string); ok {
		p.SourceURL = sourceURL
	}

	return p, nil
}
