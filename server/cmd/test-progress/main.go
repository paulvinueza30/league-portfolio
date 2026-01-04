package main

import (
	"encoding/json"
	"fmt"
	"os"

	"github.com/paulvinueza30/league-portfolio/api/internal/config"
	"github.com/paulvinueza30/league-portfolio/api/internal/services"
)

func main() {
	// Get initialized app with config, Redis, and Registry
	app := config.GetApp()
	registry := app.Registry.(*services.Registry)

	if len(os.Args) < 2 {
		fmt.Println("Usage: go run cmd/test-progress/main.go <key>")
		fmt.Println("\nAvailable keys:")
		for _, key := range registry.ListSources() {
			fmt.Printf("  - %s\n", key)
		}
		os.Exit(1)
	}

	key := os.Args[1]
	fmt.Printf("Testing progress getter for key: %s\n", key)
	fmt.Println("---")

	result, err := registry.GetProgress(key)
	if err != nil {
		fmt.Printf("Error: %v\n", err)
		os.Exit(1)
	}

	jsonData, err := json.MarshalIndent(result, "", "  ")
	if err != nil {
		fmt.Printf("Result: %+v\n", result)
	} else {
		fmt.Println(string(jsonData))
	}
}
