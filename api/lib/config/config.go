package config

import (
	"os"

	_ "github.com/joho/godotenv/autoload"
)

type Config struct {
	Progress             ProgressConfig
	Redis                RedisConfig
	PQ                   PostgresConfig
	Port                 string
	SelfHostedBackendURL string
}

type ProgressConfig struct {
	RiotAPIKey       string
	WakaAPIKey       string
	LeetcodeSession  string
	LeetcodeUsername string
}
type RedisConfig struct {
	Addr     string
	Password string
	DB       int
}
type PostgresConfig struct {
	Username string
	Password string
	URL      string
	Port     string
}

func loadConfig() (*Config, error) {
	cfg := &Config{
		Port:                 os.Getenv("PORT"),
		SelfHostedBackendURL: os.Getenv("SELF_HOSTED_BACKEND_URL"),
		Progress: ProgressConfig{
			RiotAPIKey:       os.Getenv("RIOT_API_KEY"),
			WakaAPIKey:       os.Getenv("WAKA_API_KEY"),
			LeetcodeSession:  os.Getenv("LEETCODE_SESSION"),
			LeetcodeUsername: os.Getenv("LEETCODE_USERNAME"),
		},
		PQ: PostgresConfig{
			Username: os.Getenv("POSTGRES_USER"),
			Password: os.Getenv("POSTGRES_PWD"),
			URL:      os.Getenv("POSTGRES_URL"),
			Port:     os.Getenv("POSTGRES_PORT"),
		},
		Redis: RedisConfig{
			Addr:     os.Getenv("REDIS_ADDR"),
			Password: os.Getenv("REDIS_PWD"),
			DB:       0,
		},
	}

	return cfg, nil
}
