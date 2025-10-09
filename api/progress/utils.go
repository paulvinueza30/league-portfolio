package handler

import (
	"fmt"
	"time"
)

// FormatDistanceToNow formats a time as "X ago" string
func FormatDistanceToNow(t time.Time) string {
	duration := time.Since(t)

	if duration < time.Minute {
		seconds := int(duration.Seconds())
		if seconds <= 1 {
			return "just now"
		}
		return fmt.Sprintf("%d seconds ago", seconds)
	}

	if duration < time.Hour {
		minutes := int(duration.Minutes())
		if minutes == 1 {
			return "1 minute ago"
		}
		return fmt.Sprintf("%d minutes ago", minutes)
	}

	if duration < 24*time.Hour {
		hours := int(duration.Hours())
		if hours == 1 {
			return "1 hour ago"
		}
		return fmt.Sprintf("%d hours ago", hours)
	}

	if duration < 30*24*time.Hour {
		days := int(duration.Hours() / 24)
		if days == 1 {
			return "1 day ago"
		}
		return fmt.Sprintf("%d days ago", days)
	}

	if duration < 365*24*time.Hour {
		months := int(duration.Hours() / (24 * 30))
		if months == 1 {
			return "1 month ago"
		}
		return fmt.Sprintf("%d months ago", months)
	}

	years := int(duration.Hours() / (24 * 365))
	if years == 1 {
		return "1 year ago"
	}
	return fmt.Sprintf("%d years ago", years)
}

// StartOfWeek returns the Monday at 00:00:00 of the week containing the given time
func StartOfWeek(t time.Time) time.Time {
	// Get the weekday (0 = Sunday, 1 = Monday, etc.)
	weekday := int(t.Weekday())

	// Calculate days to subtract to get to Monday
	// If Sunday (0), go back 6 days; if Monday (1), go back 0 days, etc.
	daysToMonday := (weekday + 6) % 7

	// Subtract the days and set time to midnight
	monday := t.AddDate(0, 0, -daysToMonday)
	return time.Date(monday.Year(), monday.Month(), monday.Day(), 0, 0, 0, 0, monday.Location())
}
