// Package config is reponsible for inital setup of all services and env used throughout app
package config

import (
	"log"
	"os"
	"sync"

	"github.com/paulvinueza30/league-portfolio/api/lib/directus"
	"github.com/paulvinueza30/league-portfolio/api/lib/store"
	"github.com/redis/go-redis/v9"
)

type App struct {
	Config   *Config
	Redis    *redis.Client
	Directus *directus.Client
	Registry interface{}
}

var (
	app          *App
	registryFn   func(*ProgressConfig, *redis.Client) interface{}
	registryOnce sync.Once
)

func init() {
	cfg, err := loadConfig()
	if err != nil {
		panic("failed to load config: " + err.Error())
	}

	var rdb *redis.Client

	if os.Getenv("VERCEL") == "1" {
		opt, _ := redis.ParseURL(cfg.Redis.Addr)
		rdb = redis.NewClient(opt)
	} else {
		rdb = store.NewRedisClient(cfg.Redis.Addr, cfg.Redis.Password, cfg.Redis.DB)
	}

	directusClient := directus.NewClient(cfg.Directus.BaseURL)
	log.Printf("Initialized Directus client with base URL: %s", cfg.Directus.BaseURL)

	// Test connection to Directus
	if err := directusClient.TestConnection(); err != nil {
		log.Printf("WARNING: Failed to connect to Directus at %s: %v", cfg.Directus.BaseURL, err)
		log.Printf("If running in Docker, you may need to use 'host.docker.internal:8055' or the host's IP address instead of 'localhost'")
	} else {
		log.Printf("Successfully connected to Directus at %s", cfg.Directus.BaseURL)
	}

	app = &App{
		Config:   cfg,
		Redis:    rdb,
		Directus: directusClient,
	}
}

func SetRegistryFactory(fn func(*ProgressConfig, *redis.Client) interface{}) {
	registryFn = fn
}

func GetApp() *App {
	registryOnce.Do(func() {
		if registryFn != nil {
			app.Registry = registryFn(&app.Config.Progress, app.Redis)
		}
	})
	return app
}
