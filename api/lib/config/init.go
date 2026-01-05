// Package config is reponsible for inital setup of all services and env used throughout app
package config

import (
	"os"
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

	var rdb *redis.Client
	// When on Vercel, use address only.
	if os.Getenv("VERCEL") == "1" {
		opt, _ := redis.ParseURL(cfg.Redis.Addr)
		rdb = redis.NewClient(opt)
	} else {
		// Otherwise, use the standard local Redis config.
		rdb = redis.NewClient(&redis.Options{
			Addr:     cfg.Redis.Addr,
			Password: cfg.Redis.Password,
			DB:       cfg.Redis.DB,
		})
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
