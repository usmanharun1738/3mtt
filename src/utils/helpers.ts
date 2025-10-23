import type { GitHubRepository } from "../types/github";

/**
 * Calculate pagination information
 */
export const calculatePagination = (
    totalItems: number,
    currentPage: number,
    perPage: number
) => {
    const totalPages = Math.ceil(totalItems / perPage);

    return {
        currentPage,
        totalPages,
        perPage,
        hasNext: currentPage < totalPages,
        hasPrev: currentPage > 1,
        startIndex: (currentPage - 1) * perPage,
        endIndex: Math.min(currentPage * perPage, totalItems),
    };
};

/**
 * Filter repositories by language
 */
export const filterByLanguage = (
    repos: GitHubRepository[],
    language: string | null
): GitHubRepository[] => {
    if (!language || language === "all") return repos;
    return repos.filter((repo) => repo.language === language);
};

/**
 * Get unique languages from repositories
 */
export const getUniqueLanguages = (repos: GitHubRepository[]): string[] => {
    const languages = repos
        .map((repo) => repo.language)
        .filter((lang): lang is string => lang !== null);

    return Array.from(new Set(languages)).sort();
};

/**
 * Search repositories by name or description
 */
export const searchRepos = (
    repos: GitHubRepository[],
    query: string
): GitHubRepository[] => {
    if (!query.trim()) return repos;

    const lowerQuery = query.toLowerCase();
    return repos.filter(
        (repo) =>
            repo.name.toLowerCase().includes(lowerQuery) ||
            repo.description?.toLowerCase().includes(lowerQuery)
    );
};

/**
 * Format date to readable string
 */
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    }).format(date);
};

/**
 * Format number with commas
 */
export const formatNumber = (num: number): string => {
    return new Intl.NumberFormat("en-US").format(num);
};

/**
 * Get relative time string (e.g., "2 days ago")
 */
export const getRelativeTime = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
    };

    for (const [unit, seconds] of Object.entries(intervals)) {
        const interval = Math.floor(diffInSeconds / seconds);
        if (interval >= 1) {
            return `${interval} ${unit}${interval > 1 ? "s" : ""} ago`;
        }
    }

    return "just now";
};

/**
 * Sort repositories by different criteria
 */
export const sortRepos = (
    repos: GitHubRepository[],
    sortBy: "updated" | "name" | "stars" | "forks"
): GitHubRepository[] => {
    const sorted = [...repos];

    switch (sortBy) {
        case "name":
            return sorted.sort((a, b) => a.name.localeCompare(b.name));
        case "stars":
            return sorted.sort(
                (a, b) => b.stargazers_count - a.stargazers_count
            );
        case "forks":
            return sorted.sort((a, b) => b.forks_count - a.forks_count);
        case "updated":
        default:
            return sorted.sort(
                (a, b) =>
                    new Date(b.updated_at).getTime() -
                    new Date(a.updated_at).getTime()
            );
    }
};
