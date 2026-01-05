package api

import (
	"net/http"

	"github.com/paulvinueza30/league-portfolio/api/internal/api"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	router := api.GetRouter()
	router.ServeHTTP(w, r)
}
