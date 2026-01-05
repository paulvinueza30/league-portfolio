package config

import (
	"os"
	"strconv"

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
	Host     string
	Port     int
	User     string
	Password string
	DBName   string
}

func loadConfig() (*Config, error) {
	postgresPortStr := os.Getenv("POSTGRES_PORT")
	if postgresPortStr == "" {
		postgresPortStr = "5432"
	}
	postgresPort, err := strconv.Atoi(postgresPortStr)
	if err != nil {
		return nil, err
	}
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
			Host:     os.Getenv("POSTGRES_HOST"),
			User:     os.Getenv("POSTGRES_USER"),
			Password: os.Getenv("POSTGRES_PASSWORD"),
			DBName:   os.Getenv("POSTGRES_DB"),
			Port:     postgresPort,
		},
		Redis: RedisConfig{
			Addr:     os.Getenv("REDIS_ADDR"),
			Password: os.Getenv("REDIS_PWD"),
			DB:       0,
		},
	}

	return cfg, nil
}
