// Package config is reponsible for inital setup of all services and env used throughout app
package config

import (
	"context"
	"log"
	"sync"

	"github.com/redis/go-redis/v9"
)

type App struct {
	Config   *Config
	Redis    *redis.Client
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

	rdb := redis.NewClient(&redis.Options{
		Addr:     cfg.Redis.Addr,
		Password: cfg.Redis.Password,
		Network:  "tcp4",
	})

	// Test connection to Redis
	ctx := context.Background()
	if err := rdb.Ping(ctx).Err(); err != nil {
		log.Printf("WARNING: Failed to connect to Redis at %s: %v", cfg.Redis.Addr, err)
		log.Printf("If running locally, ensure Redis is running on localhost:6379 or update REDIS_ADDR in .env")
	} else {
		log.Printf("Successfully connected to Redis at %s", cfg.Redis.Addr)
	}

	app = &App{
		Config: cfg,
		Redis:  rdb,
	}

	app = &App{
		Config: cfg,
		Redis:  rdb,
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
