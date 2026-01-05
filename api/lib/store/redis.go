// Package store setups the storage clients used in the app
package store

import (
	"github.com/paulvinueza30/league-portfolio/api/lib/config"
	"github.com/redis/go-redis/v9"
)

func NewRedisClient(cfg *config.RedisConfig) *redis.Client {
	return redis.NewClient(&redis.Options{
		Addr:     cfg.Addr,
		Password: cfg.Password,
		DB:       cfg.DB,
	})
}
