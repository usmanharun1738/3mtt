import apiClient from "./client";
import { config } from "../config/config";
import type {
    GitHubRepository,
    GitHubUser,
    CreateRepoPayload,
    UpdateRepoPayload,
} from "../types/github";

/**
 * GitHub API Service
 * Handles all interactions with the GitHub API
 */
class GitHubService {
    /**
     * Get authenticated user information
     */
    async getUser(): Promise<GitHubUser> {
        const response = await apiClient.get<GitHubUser>(
            `/users/${config.githubUsername}`
        );
        return response.data;
    }

    /**
     * Get all repositories for a user with pagination
     * @param page - Page number (starts at 1)
     * @param perPage - Number of items per page
     */
    async getRepositories(
        page: number = 1,
        perPage: number = config.reposPerPage
    ): Promise<GitHubRepository[]> {
        const response = await apiClient.get<GitHubRepository[]>(
            `/users/${config.githubUsername}/repos`,
            {
                params: {
                    page,
                    per_page: perPage,
                    sort: "updated",
                    direction: "desc",
                },
            }
        );
        return response.data;
    }

    /**
     * Get a single repository by name
     * @param repoName - Repository name
     */
    async getRepository(repoName: string): Promise<GitHubRepository> {
        const response = await apiClient.get<GitHubRepository>(
            `/repos/${config.githubUsername}/${repoName}`
        );
        return response.data;
    }

    /**
     * Search repositories by query
     * @param query - Search query
     * @param page - Page number
     * @param perPage - Items per page
     */
    async searchRepositories(
        query: string,
        page: number = 1,
        perPage: number = config.reposPerPage
    ): Promise<{ items: GitHubRepository[]; total_count: number }> {
        const response = await apiClient.get<{
            items: GitHubRepository[];
            total_count: number;
        }>("/search/repositories", {
            params: {
                q: `user:${config.githubUsername} ${query}`,
                page,
                per_page: perPage,
                sort: "updated",
            },
        });
        return response.data;
    }

    /**
     * Create a new repository (requires authentication with proper token)
     * @param payload - Repository creation data
     */
    async createRepository(
        payload: CreateRepoPayload
    ): Promise<GitHubRepository> {
        const response = await apiClient.post<GitHubRepository>(
            "/user/repos",
            payload
        );
        return response.data;
    }

    /**
     * Update an existing repository (requires authentication with proper token)
     * @param repoName - Repository name
     * @param payload - Repository update data
     */
    async updateRepository(
        repoName: string,
        payload: UpdateRepoPayload
    ): Promise<GitHubRepository> {
        const response = await apiClient.patch<GitHubRepository>(
            `/repos/${config.githubUsername}/${repoName}`,
            payload
        );
        return response.data;
    }

    /**
     * Delete a repository (requires authentication with proper token)
     * @param repoName - Repository name
     */
    async deleteRepository(repoName: string): Promise<void> {
        await apiClient.delete(`/repos/${config.githubUsername}/${repoName}`);
    }

    /**
     * Get repository languages
     * @param repoName - Repository name
     */
    async getRepositoryLanguages(
        repoName: string
    ): Promise<Record<string, number>> {
        const response = await apiClient.get<Record<string, number>>(
            `/repos/${config.githubUsername}/${repoName}/languages`
        );
        return response.data;
    }

    /**
     * Get repository README
     * @param repoName - Repository name
     */
    async getRepositoryReadme(repoName: string): Promise<string> {
        try {
            const response = await apiClient.get(
                `/repos/${config.githubUsername}/${repoName}/readme`,
                {
                    headers: {
                        Accept: "application/vnd.github.v3.raw",
                    },
                }
            );
            return response.data;
        } catch {
            return "";
        }
    }
}

export default new GitHubService();
