package api

import "github.com/gin-gonic/gin"

var r *gin.Engine

func GetRouter() *gin.Engine {
	return r
}

func init() {
	r = gin.Default()

	r.Static("/assets", "./public/assets")

	r.GET("/api/health", checkHealth)
	r.GET("/api/progress", getProgress)
	r.GET("/api/projects", getProjects)
	r.GET("/api/projects/:slug/:media", getProjectMedia)
	r.GET("/api/projects/:slug", getProject)
	r.GET("/api/posts", getPosts)
	r.GET("/api/posts/:slug/:media", getPostMedia)
	r.GET("/api/posts/:slug", getPost)
}
