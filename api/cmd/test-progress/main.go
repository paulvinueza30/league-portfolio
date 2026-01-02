package main

import (
	"encoding/json"
	"fmt"
	"os"

	"github.com/paulvinueza30/league-portfolio/api/internal/services"
)

func main() {
	if len(os.Args) < 2 {
		fmt.Println("Usage: go run cmd/test-progress/main.go <source>")
		fmt.Println("\nAvailable sources:")
		for _, source := range services.ListSources() {
			fmt.Printf("  - %s\n", source)
		}
		os.Exit(1)
	}

	source := os.Args[1]
	fmt.Printf("Testing progress getter for: %s\n", source)
	fmt.Println("---")

	result, err := services.TestSource(source)
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
