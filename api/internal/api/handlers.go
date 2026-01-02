package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func checkHealth(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "backend is running",
	})
}

func getProgress(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "progress logic here...",
	})
}
