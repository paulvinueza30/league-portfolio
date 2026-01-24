package services

import (
	"fmt"
	"os"
	"strings"
	"time"

	front "github.com/adrg/frontmatter"
)

type BlogPost struct {
	Title   string `json:"title"`
	Date    string `json:"date"`
	Slug    string `json:"slug"`
	Content string `json:"content"`
}

func GetAllPosts() ([]BlogPost, error) {
	postsDir := "/app/posts"
	var posts []BlogPost

	dirs, err := os.ReadDir(postsDir)
	if err != nil {
		return nil, fmt.Errorf("failed to read posts directory: %w", err)
	}

	for _, dir := range dirs {
		if !dir.IsDir() {
			continue
		}

		post, err := GetPost(dir.Name())
		if err != nil {
			continue
		}

		posts = append(posts, *post)
	}

	return posts, nil
}

func GetPost(slug string) (*BlogPost, error) {
	postPath := fmt.Sprintf("/app/posts/%s/post.md", slug)
	data, err := os.ReadFile(postPath)
	if err != nil {
		return nil, fmt.Errorf("failed to read post file: %w", err)
	}

	var frontmatter struct {
		Title string `yaml:"title"`
		Date  string `yaml:"date"`
	}

	content, err := front.Parse(strings.NewReader(string(data)), &frontmatter)
	if err != nil {
		return nil, fmt.Errorf("failed to parse frontmatter: %w", err)
	}

	title := frontmatter.Title
	if title == "" {
		title = slug
	}

	date := frontmatter.Date
	if date == "" {
		date = time.Now().Format("2006-01-02")
	}

	post := &BlogPost{
		Title:   title,
		Date:    date,
		Slug:    slug,
		Content: string(content),
	}

	return post, nil
}
