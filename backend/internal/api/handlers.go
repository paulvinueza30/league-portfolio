package api

import (
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/paulvinueza30/league-portfolio/backend/internal/config"
	"github.com/paulvinueza30/league-portfolio/backend/internal/models"
	"github.com/paulvinueza30/league-portfolio/backend/internal/services"
	"github.com/paulvinueza30/league-portfolio/backend/internal/services/progress"
)

func convertToModelProjects(servicesProjects []services.Project) []models.Project {
	var modelProjects []models.Project
	for _, p := range servicesProjects {
		modelProjects = append(modelProjects, models.Project{
			ID:          p.ID,
			Title:       p.Title,
			Description: p.Description,
			ImageURL:    buildImageURL(p.Slug, p.HeroImage),
			DemoURL:     buildDemoURL(p.Slug, p.DemoVideo),
			SourceURL:   p.GithubURL,
			BlogURL:     p.BlogURL,
			Date:        p.Date,
			Tech:        p.Tech,
			Featured:    p.Featured,
		})
	}
	return modelProjects
}

func convertToModelPosts(servicesPosts []services.BlogPost) []models.Post {
	var modelPosts []models.Post
	for _, p := range servicesPosts {
		modelPosts = append(modelPosts, models.Post{
			ID:        0,
			Slug:      p.Slug,
			Title:     p.Title,
			Content:   p.Content,
			ImageURL:  "",
			CreatedAt: parseDate(p.Date),
		})
	}
	return modelPosts
}

func buildImageURL(slug, filename string) string {
	if filename == "" {
		return ""
	}
	return "/api/projects/" + slug + "/" + filename
}

func buildDemoURL(slug, filename string) string {
	if filename == "" {
		return ""
	}
	return "/api/projects/" + slug + "/" + filename
}

func parseDate(dateStr string) time.Time {
	t, _ := time.Parse("2006-01-02", dateStr)
	return t
}

func checkHealth(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "backend is running",
	})
}

func getProgress(c *gin.Context) {
	app := config.GetApp()
	registry, ok := app.Registry.(*progress.Registry)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "internal server error: invalid registry type"})
		return
	}

	key := c.Query("key")
	progress, err := registry.GetProgress(key)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, progress)
}

func getProjects(c *gin.Context) {
	projects, err := services.GetAllProjects()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	response := models.ProjectsResponse{
		Data:      convertToModelProjects(projects),
		Timestamp: time.Now().UnixMilli(),
		Source:    "live",
	}
	c.JSON(http.StatusOK, response)
}

func getProject(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
		return
	}
	project, err := services.GetProjectByID(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "project not found"})
		return
	}

	response := convertToModelProjects([]services.Project{*project})
	c.JSON(http.StatusOK, response[0])
}

func getPosts(c *gin.Context) {
	posts, err := services.GetAllPosts()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	response := models.PostsResponse{
		Data:      convertToModelPosts(posts),
		Timestamp: time.Now().UnixMilli(),
		Source:    "live",
	}
	c.JSON(http.StatusOK, response)
}

func getPost(c *gin.Context) {
	slug := c.Param("slug")
	post, err := services.GetPost(slug)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "post not found"})
		return
	}

	response := convertToModelPosts([]services.BlogPost{*post})
	c.JSON(http.StatusOK, response[0])
}

func getProjectMedia(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
		return
	}
	filename := c.Param("media")
	project, err := services.GetProjectByID(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "project not found"})
		return
	}
	fmt.Printf("DEBUG: Serving file - id: %d, slug: %s, filename: %s\n", id, project.Slug, filename)
	filePath := "../data/projects/" + project.Slug + "/" + filename

	c.File(filePath)
}

func getPostMedia(c *gin.Context) {
	slug := c.Param("slug")
	filename := c.Param("media")
	filePath := "/app/api/posts/" + slug + "/" + filename

	c.File(filePath)
}
