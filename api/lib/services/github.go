package services

import (
	"context"
	"fmt"
	"time"

	"github.com/dustin/go-humanize"
	"github.com/google/go-github/v80/github"
	"github.com/paulvinueza30/league-portfolio/api/lib/models"
)

type githubService struct {
	client *github.Client
}

func newGithubService() *githubService {
	return &githubService{
		client: github.NewClient(nil),
	}
}

func (s *githubService) getDetails() *models.ApiDetails {
	return &models.ApiDetails{
		RedisKey:   "github_cache",
		StaleAfter: 15 * time.Minute,
		FetchFn:    s.fetch,
	}
}

func (s *githubService) fetch() (any, error) {
	ctx := context.Background()
	username := "paulvinueza30"

	sevenDaysAgo := time.Now().AddDate(0, 0, -7).Format("2006-01-02")
	query := fmt.Sprintf("author:%s committer-date:>=%s", username, sevenDaysAgo)

	opts := &github.SearchOptions{
		Sort:        "committer-date",
		Order:       "desc",
		ListOptions: github.ListOptions{PerPage: 100},
	}

	result, _, err := s.client.Search.Commits(ctx, query, opts)
	if err != nil {
		return nil, err
	}

	var commitList []map[string]any
	for _, item := range result.Commits {
		repoName := item.GetRepository().GetFullName()
		commitList = append(commitList, map[string]any{
			"commitMessage": item.GetCommit().GetMessage(),
			"commitUrl":     item.GetHTMLURL(),
			"repo": map[string]any{
				"name": repoName,
				"url":  "https://github.com/" + repoName,
			},
			"created_at": humanize.Time(item.GetCommit().GetCommitter().GetDate().Time),
		})
	}

	return map[string]any{
		"commits":       commitList,
		"weeklyCounter": result.GetTotal(),
	}, nil
}
