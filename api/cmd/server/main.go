package main

import (
	"log"

	"github.com/paulvinueza30/league-portfolio/api/internal/api"
	"github.com/paulvinueza30/league-portfolio/api/internal/config"
	_ "github.com/paulvinueza30/league-portfolio/api/internal/services"
)

func main() {
	app := config.GetApp()
	_ = app

	r := api.GetRouter()

	if err := r.Run(); err != nil {
		log.Fatalf("failed to run server: %v", err)
	}
}
