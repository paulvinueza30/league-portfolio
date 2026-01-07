// Package api handles the routes and handlers
package api

import "github.com/gin-gonic/gin"

var r *gin.Engine

func GetRouter() *gin.Engine {
	return r
}

func init() {
	r = gin.Default()
	r.GET("/api/health", checkHealth)
	r.GET("/api/progress", getProgress)
	r.GET("/api/projects", getProjects)
	r.GET("/api/assets/:fileId", proxyImage)
	r.GET("/api/posts", getPosts)
}
