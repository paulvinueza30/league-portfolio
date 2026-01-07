package services

import (
	"fmt"
	"log"
	"strconv"
	"time"

	"github.com/paulvinueza30/league-portfolio/api/lib/directus"
	"github.com/paulvinueza30/league-portfolio/api/lib/models"
)

type PostService struct {
	client *directus.Client
}

func NewPostService(client *directus.Client) *PostService {
	return &PostService{
		client: client,
	}
}

func (s *PostService) FetchPosts() ([]models.Post, error) {
	data, err := s.client.GetCollection("posts")
	if err != nil {
		log.Printf("Error fetching posts from Directus: %v", err)
		return nil, err
	}

	var posts []models.Post
	for _, item := range data {
		post, err := mapToPost(item)
		if err != nil {
			log.Printf("Error mapping post: %v", err)
			continue
		}
		posts = append(posts, post)
	}

	return posts, nil
}

func mapToPost(item map[string]interface{}) (models.Post, error) {
	var p models.Post

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

	if content, ok := item["content"].(string); ok {
		p.Content = content
	}

	if imageFile, ok := item["image"].(map[string]interface{}); ok {
		if fileID, ok := imageFile["id"].(string); ok {
			p.ImageURL = fileID
		}
	} else if imageID, ok := item["image"].(string); ok {
		p.ImageURL = imageID
	}

	if createdAt, ok := item["date_created"].(string); ok {
		if t, err := time.Parse(time.RFC3339, createdAt); err == nil {
			p.CreatedAt = t
		}
	}

	return p, nil
}

