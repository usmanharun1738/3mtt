// Environment configuration

export const config = {
    // GitHub username - Replace with your GitHub username
    githubUsername: import.meta.env.VITE_GITHUB_USERNAME || "octocat",

    // GitHub Personal Access Token (optional but recommended to avoid rate limits)
    // Create token at: https://github.com/settings/tokens
    // Required scopes: public_repo, read:user
    githubToken: import.meta.env.VITE_GITHUB_TOKEN || "",

    // GitHub API Base URL
    apiBaseUrl: "https://api.github.com",

    // Pagination
    reposPerPage: 20,
};
