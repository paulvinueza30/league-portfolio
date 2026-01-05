// Package store setups the storage clients used in the app
package store

import (
	"database/sql"
	"log"

	_ "github.com/lib/pq"
)

func NewPostgresClient(connectionString string) (*sql.DB, error) {
	db, err := sql.Open("postgres", connectionString)
	if err != nil {
		log.Printf("failed to open postgres client: %v", err)
		return nil, err
	}

	err = db.Ping()
	if err != nil {
		log.Printf("failed to ping postgres client: %v", err)
		return nil, err
	}

	log.Println("Successfully connected to postgres database")
	return db, nil
}
