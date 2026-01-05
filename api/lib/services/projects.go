package services

import (
	"context"
	"database/sql"
	"log"
	"time"

	"github.com/paulvinueza30/league-portfolio/api/lib/models"
)

type ProjectService struct {
	db *sql.DB
}

func NewProjectService(db *sql.DB) *ProjectService {
	return &ProjectService{
		db: db,
	}
}

func (s *ProjectService) FetchProjects() ([]models.Project, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	rows, err := s.db.QueryContext(ctx, "SELECT id, title, description, image_url, demo_url, source_url FROM projects ORDER BY id ASC")
	if err != nil {
		log.Printf("Error querying projects: %v", err)
		return nil, err
	}
	defer rows.Close()

	var projects []models.Project
	for rows.Next() {
		var p models.Project
		if err := rows.Scan(&p.ID, &p.Title, &p.Description, &p.ImageURL, &p.DemoURL, &p.SourceURL); err != nil {
			log.Printf("Error scanning project row: %v", err)
			return nil, err
		}
		projects = append(projects, p)
	}

	if err = rows.Err(); err != nil {
		log.Printf("Error during rows iteration: %v", err)
		return nil, err
	}

	return projects, nil
}