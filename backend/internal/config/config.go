package config

import (
	"os"
)

type Config struct {
	Progress             ProgressConfig
	Redis                RedisConfig
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
}

func loadConfig() (*Config, error) {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	redisAddr := os.Getenv("REDIS_ADDR")
	if redisAddr == "" {
		redisAddr = "localhost:6379"
	}

	cfg := &Config{
		Port:                 port,
		SelfHostedBackendURL: os.Getenv("SELF_HOSTED_BACKEND_URL"),
		Progress: ProgressConfig{
			RiotAPIKey:       os.Getenv("RIOT_API_KEY"),
			WakaAPIKey:       os.Getenv("WAKA_API_KEY"),
			LeetcodeSession:  os.Getenv("LEETCODE_SESSION"),
			LeetcodeUsername: os.Getenv("LEETCODE_USERNAME"),
		},
		Redis: RedisConfig{
			Addr:     redisAddr,
			Password: os.Getenv("REDIS_PWD"),
		},
	}

	return cfg, nil
}
