// Package store setups the storage clients used in the app
package store

import (
	"github.com/redis/go-redis/v9"
)

func NewRedisClient(addr, password string, db int) *redis.Client {
	return redis.NewClient(&redis.Options{
		Addr:     addr,
		Password: password,
		DB:       db,
		Network:  "tcp4",
	})
}
