// GitHub API Types

export interface GitHubRepository {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    private: boolean;
    owner: {
        login: string;
        id: number;
        avatar_url: string;
        html_url: string;
    };
    html_url: string;
    description: string | null;
    fork: boolean;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    homepage: string | null;
    size: number;
    stargazers_count: number;
    watchers_count: number;
    language: string | null;
    forks_count: number;
    open_issues_count: number;
    default_branch: string;
    topics: string[];
    visibility: string;
    license: {
        key: string;
        name: string;
        url: string;
    } | null;
}

export interface GitHubUser {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
    name: string;
    company: string | null;
    blog: string | null;
    location: string | null;
    email: string | null;
    bio: string | null;
    public_repos: number;
    followers: number;
    following: number;
    created_at: string;
}

export interface CreateRepoPayload {
    name: string;
    description?: string;
    homepage?: string;
    private?: boolean;
    auto_init?: boolean;
}

export interface UpdateRepoPayload {
    name?: string;
    description?: string;
    homepage?: string;
    private?: boolean;
    default_branch?: string;
}

export interface PaginationInfo {
    currentPage: number;
    totalPages: number;
    perPage: number;
    hasNext: boolean;
    hasPrev: boolean;
}
