package api

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/paulvinueza30/league-portfolio/api/lib/config"
	"github.com/paulvinueza30/league-portfolio/api/lib/models"
	"github.com/paulvinueza30/league-portfolio/api/lib/services"
)

func checkHealth(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "backend is running",
	})
}

func getProgress(c *gin.Context) {
	app := config.GetApp()
	registry, ok := app.Registry.(*services.Registry)
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
	app := config.GetApp()
	if app.Directus == nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{"error": "Directus client not initialized"})
		return
	}

	projectService := services.NewProjectService(app.Directus)
	projects, err := projectService.FetchProjects()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	response := models.ProjectsResponse{
		Data:      projects,
		Timestamp: time.Now().UnixMilli(),
		Source:    "live",
	}
	c.JSON(http.StatusOK, response)
}

func getPosts(c *gin.Context) {
	app := config.GetApp()
	if app.Directus == nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{"error": "Directus client not initialized"})
		return
	}

	postService := services.NewPostService(app.Directus)
	posts, err := postService.FetchPosts()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	response := models.PostsResponse{
		Data:      posts,
		Timestamp: time.Now().UnixMilli(),
		Source:    "live",
	}
	c.JSON(http.StatusOK, response)
}

func proxyImage(c *gin.Context) {
	app := config.GetApp()
	if app.Directus == nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{"error": "Directus client not initialized"})
		return
	}

	fileID := c.Param("fileId")
	if fileID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "file ID is required"})
		return
	}

	if err := app.Directus.ProxyImage(c.Writer, c.Request, fileID); err != nil {
		if !c.Writer.Written() {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		return
	}
}
