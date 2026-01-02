package main

import (
	"log"

	"github.com/paulvinueza30/league-portfolio/api/internal/api"
)

func main() {
	r := api.GetRouter()

	if err := r.Run(); err != nil {
		log.Fatalf("failed to run server: %v", err)
	}
}
