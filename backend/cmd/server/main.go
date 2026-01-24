package main

import (
	"log"

	"github.com/paulvinueza30/league-portfolio/backend/internal/api"
	"github.com/paulvinueza30/league-portfolio/backend/internal/config"
	_ "github.com/paulvinueza30/league-portfolio/backend/internal/services"
)

func main() {
	app := config.GetApp()
	_ = app

	r := api.GetRouter()

	if err := r.Run(); err != nil {
		log.Fatalf("failed to run server: %v", err)
	}
}
