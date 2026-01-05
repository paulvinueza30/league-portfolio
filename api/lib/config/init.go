// Package config is reponsible for inital setup of all services and env used throughout app
package config

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"sync"

	"github.com/paulvinueza30/league-portfolio/api/lib/store"
	"github.com/redis/go-redis/v9"
)

type App struct {
	Config   *Config
	Redis    *redis.Client
	Postgres *sql.DB
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

	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		cfg.PQ.Host, cfg.PQ.Port, cfg.PQ.User, cfg.PQ.Password, cfg.PQ.DBName)
	pgdb, pgErr := store.NewPostgresClient(psqlInfo)
	if pgErr != nil {
		log.Printf("Failed to connect to PostgreSQL: %v. Proceeding without DB connection.", pgErr)
	}

	app = &App{
		Config:   cfg,
		Redis:    rdb,
		Postgres: pgdb,
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
