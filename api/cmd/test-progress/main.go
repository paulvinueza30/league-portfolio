package main

import (
	"encoding/json"
	"fmt"
	"log"
	"os"

	"github.com/paulvinueza30/league-portfolio/api/internal/config"
	"github.com/paulvinueza30/league-portfolio/api/internal/services"
)

func main() {
	cfg, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("failed to load config: %v", err)
	}

	registry := services.NewRegistry(&cfg.Progress)

	if len(os.Args) < 2 {
		fmt.Println("Usage: go run cmd/test-progress/main.go <source>")
		fmt.Println("\nAvailable sources:")
		for _, source := range registry.ListSources() {
			fmt.Printf("  - %s\n", source)
		}
		os.Exit(1)
	}

	source := os.Args[1]
	fmt.Printf("Testing progress getter for: %s\n", source)
	fmt.Println("---")

	result, err := registry.TestSource(source)
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
