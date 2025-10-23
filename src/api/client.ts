import axios, { AxiosError } from "axios";
import type { AxiosInstance } from "axios";
import { config } from "../config/config";

// Create axios instance with base configuration
const apiClient: AxiosInstance = axios.create({
    baseURL: config.apiBaseUrl,
    headers: {
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
    },
});

// Add authorization token if available
if (config.githubToken) {
    apiClient.defaults.headers.common[
        "Authorization"
    ] = `Bearer ${config.githubToken}`;
}

// Response interceptor for error handling
apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response) {
            // Server responded with error status
            const status = error.response.status;
            const message =
                (error.response.data as { message?: string })?.message ||
                error.message;

            switch (status) {
                case 401:
                    console.error(
                        "Unauthorized: Invalid or missing GitHub token"
                    );
                    break;
                case 403:
                    console.error(
                        "Forbidden: Rate limit exceeded or insufficient permissions"
                    );
                    break;
                case 404:
                    console.error("Not Found: Resource does not exist");
                    break;
                default:
                    console.error(`GitHub API Error: ${message}`);
            }
        } else if (error.request) {
            // Request was made but no response received
            console.error("Network Error: No response from GitHub API");
        } else {
            // Something else happened
            console.error("Error:", error.message);
        }

        return Promise.reject(error);
    }
);

export default apiClient;
