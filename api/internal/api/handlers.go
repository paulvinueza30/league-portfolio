package api

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/paulvinueza30/league-portfolio/api/internal/config"
	"github.com/paulvinueza30/league-portfolio/api/internal/models"
	"github.com/paulvinueza30/league-portfolio/api/internal/services"
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

	progress, err := registry.GetProgress()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("failed to get all progress: %v", err)})
		return
	}

	apiResponse := &models.ApiResponse[map[string]any]{
		Data:      progress,
		Timestamp: time.Now(),
	}

	c.JSON(http.StatusOK, apiResponse)
}
