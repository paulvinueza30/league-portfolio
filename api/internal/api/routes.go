package api

import "github.com/gin-gonic/gin"

var r *gin.Engine

func GetRouter() *gin.Engine {
	return r
}

func init() {
	r = gin.Default()
	r.GET("/health", checkHealth)
	r.GET("/progress", getProgress)
}
