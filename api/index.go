package handler

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/paulvinueza30/league-portfolio/api/lib/api"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("inside of the handler")
	r.URL.Path = strings.TrimPrefix(r.URL.Path, "/api")
	router := api.GetRouter()
	router.ServeHTTP(w, r)
}
