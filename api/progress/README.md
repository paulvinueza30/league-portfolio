# League Portfolio Progress API (Go + Gin)

This is a serverless API built with Go and the Gin web framework, designed to track and cache progress data from multiple sources including Riot Games, GitHub, LeetCode, WakaTime, and Anki.

## Architecture Overview

The API is structured as a Vercel serverless function that:
1. Uses **Gin** as the HTTP router/framework
2. Integrates with **Upstash Redis** for caching
3. Fetches data from multiple third-party APIs
4. Implements smart caching with configurable stale-after periods
5. Falls back to stale cache if live fetch fails

## Project Structure

```
api/progress/
├── index.go        # Main entry point and Gin router setup
├── registry.go     # Cache management and API registry
├── types.go        # Type definitions for all API responses
├── utils.go        # Utility functions (date formatting, etc.)
├── anki.go        # Anki API integration
├── github.go      # GitHub API integration
├── leetcode.go    # LeetCode API integration
├── riot.go        # Riot Games API integration
├── waka.go        # WakaTime API integration
├── go.mod         # Go module dependencies
└── README.md      # This file
```

## How It Works

### Caching Strategy

Each API provider has a configurable `staleAfter` duration:
- **Riot Games**: 0 minutes (always fetch fresh)
- **GitHub**: 1 minute
- **LeetCode**: 5 minutes
- **WakaTime**: 30 minutes
- **Anki**: Infinity (never expires)

When a request comes in:
1. Check Redis cache
2. If data exists and is fresh (within `staleAfter` period), return with `source: "store"`
3. If stale or missing, fetch fresh data and cache it, return with `source: "live"`
4. If fetch fails but stale cache exists, return stale data with `source: "backup"`
5. If no cache and fetch fails, return error

### API Endpoints

#### `GET /api/progress`
Returns list of available API keys and routes.

**Response:**
```json
{
  "routes": [
    "/api/progress?key=riot",
    "/api/progress?key=anki",
    "/api/progress?key=github",
    "/api/progress?key=waka",
    "/api/progress?key=leetcode"
  ],
  "keys": ["riot", "anki", "github", "waka", "leetcode"]
}
```

#### `GET /api/progress?key={api_key}`
Returns progress data for the specified API key.

**Example:**
```bash
curl https://your-domain.vercel.app/api/progress?key=github
```

**Response:**
```json
{
  "data": {
    "commits": [...],
    "weeklyCounter": 5
  },
  "timestamp": 1696176000000,
  "source": "live"
}
```

### API Integrations

#### 1. Riot Games API
Fetches the most recent ranked League of Legends match data including:
- Summoner information
- Champion played
- KDA (Kills/Deaths/Assists)
- Win/Loss status
- Current rank and LP

**Environment Variables:**
- `RIOT_API_KEY` - Your Riot Games API key

#### 2. GitHub API
Fetches recent public push events including:
- Recent commits with messages
- Repository information
- Weekly commit counter

**No authentication required** (uses public API)

#### 3. LeetCode API
Fetches recent coding problem submissions including:
- Problem title and link
- Submission status
- Programming language used
- Relative time

**Environment Variables:**
- `LEETCODE_SESSION` - Your LeetCode session cookie
- `LEETCODE_USERNAME` - Your LeetCode username

#### 4. WakaTime API
Fetches weekly coding statistics including:
- Total coding time
- Daily average
- Top language, project, editor, and OS

**Environment Variables:**
- `WAKA_API_KEY` - Your WakaTime API key

#### 5. Anki API
Placeholder implementation (returns null).

## Environment Variables

Create a `.env` file or configure in Vercel:

```env
# Redis (Upstash)
KV_REST_API_URL=https://your-redis-instance.upstash.io
KV_REST_API_TOKEN=your-redis-token

# Riot Games
RIOT_API_KEY=your-riot-api-key

# LeetCode (optional)
LEETCODE_SESSION=your-session-cookie
LEETCODE_USERNAME=your-username

# WakaTime
WAKA_API_KEY=your-waka-api-key

# Optional: Set to "debug" for verbose logging
GIN_MODE=release
```

## Local Development

### Prerequisites
- Go 1.21 or higher
- Redis instance (Upstash recommended)

### Setup

1. **Install dependencies:**
   ```bash
   cd api/progress
   go mod download
   ```

2. **Create `.env` file** with required environment variables (see above)

3. **Run locally** (requires Vercel CLI):
   ```bash
   # Install Vercel CLI
   npm install -g vercel

   # Run dev server
   vercel dev
   ```

4. **Test the endpoint:**
   ```bash
   curl http://localhost:3000/api/progress
   curl http://localhost:3000/api/progress?key=github
   ```

### Building

To ensure your code compiles correctly:
```bash
cd api/progress
go build -o handler .
```

## Deployment to Vercel

### First Time Setup

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Link your project:**
   ```bash
   vercel link
   ```

4. **Set environment variables:**
   ```bash
   vercel env add KV_REST_API_URL
   vercel env add KV_REST_API_TOKEN
   vercel env add RIOT_API_KEY
   vercel env add WAKA_API_KEY
   # Add others as needed
   ```

### Deploy

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Vercel Configuration

The `vercel.json` file specifies:
- Runtime: `go1.x`
- Memory: 128 MB
- Max duration: 10 seconds

```json
{
  "functions": {
    "api/progress/index.go": {
      "runtime": "go1.x",
      "memory": 128,
      "maxDuration": 10
    }
  }
}
```

## Advantages of Go + Gin

### Over TypeScript/Node.js:
1. **Type Safety**: Strong static typing catches errors at compile time
2. **Performance**: Faster execution and lower memory usage
3. **Simplicity**: No complex build steps, no module resolution issues
4. **Concurrency**: Native goroutines for efficient concurrent operations
5. **Single Binary**: Easy deployment, no `node_modules` hassle
6. **Cold Start**: Faster cold starts on serverless platforms

### Why Gin?
- Lightweight and fast HTTP framework
- Similar API to Express.js (easy to learn)
- Built-in middleware support
- Excellent routing and parameter handling
- Great for serverless functions

## Troubleshooting

### Redis Connection Issues
- Verify `KV_REST_API_URL` and `KV_REST_API_TOKEN` are set correctly
- Check Upstash Redis dashboard for connection status
- Ensure your Redis instance allows connections from Vercel IPs

### API Rate Limits
- Riot API: ~100 requests per 2 minutes
- GitHub: 60 requests/hour (unauthenticated), 5000/hour (authenticated)
- LeetCode: Depends on session validity
- WakaTime: Generous limits with API key

### Build Errors
- Ensure Go 1.21+ is installed
- Run `go mod tidy` to clean up dependencies
- Check that all imports are correct

### Runtime Errors
- Check Vercel function logs: `vercel logs`
- Enable debug mode: Set `GIN_MODE=debug` in environment variables
- Test locally with `vercel dev` first

## Migration Notes from TypeScript

Key differences from the original TypeScript implementation:
1. **No weird import tricks**: Go's module system is straightforward
2. **Explicit types**: All response types are defined in `types.go`
3. **Better error handling**: Go's explicit error returns make debugging easier
4. **Native JSON handling**: No need for separate JSON parsing libraries
5. **Concurrent fetching**: Easy to add with goroutines if needed

## Contributing

To add a new API provider:

1. Create `{provider}.go` with `FetchFn` implementation
2. Add response types to `types.go`
3. Register in `registry.go` under `ApiRegistry`
4. Update this README

## License

Same as parent project.

