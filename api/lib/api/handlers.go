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
	if app.Postgres == nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{"error": "Database not connected"})
		return
	}

	projectService := services.NewProjectService(app.Postgres)
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
