import React, { useState, useEffect, useMemo } from "react";
import { Outlet, Link } from "react-router-dom";
import githubService from "../api/githubService";
import type { GitHubRepository, GitHubUser } from "../types/github";
import { RepoCard } from "../components/RepoCard";
import { SearchFilter } from "../components/SearchFilter";
import { Pagination } from "../components/Pagination";
import { Loading } from "../components/Loading";
import { CreateRepoModal } from "../components/CreateRepoModal";
import { UpdateRepoModal } from "../components/UpdateRepoModal";
import { DeleteRepoModal } from "../components/DeleteRepoModal";
import {
    searchRepos,
    filterByLanguage,
    getUniqueLanguages,
    sortRepos,
    calculatePagination,
} from "../utils/helpers";
import { config } from "../config/config";

export const RepositoriesPage: React.FC = () => {
    const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
    const [user, setUser] = useState<GitHubUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Filter and search states
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("all");
    const [sortBy, setSortBy] = useState<
        "updated" | "name" | "stars" | "forks"
    >("updated");
    const [currentPage, setCurrentPage] = useState(1);

    // Modal states
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedRepo, setSelectedRepo] = useState<GitHubRepository | null>(
        null
    );
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Fetch all repositories and user data
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Fetch user info and all repositories
                const [userData, allRepos] = await Promise.all([
                    githubService.getUser(),
                    fetchAllRepositories(),
                ]);

                setUser(userData);
                setRepositories(allRepos);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(
                    "Failed to load repositories. Please check your configuration and try again."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Fetch all repositories (handling pagination from GitHub)
    const fetchAllRepositories = async (): Promise<GitHubRepository[]> => {
        const allRepos: GitHubRepository[] = [];
        let page = 1;
        let hasMore = true;

        while (hasMore) {
            const repos = await githubService.getRepositories(page, 100);
            allRepos.push(...repos);

            // If we get less than 100 repos, we've reached the end
            hasMore = repos.length === 100;
            page++;
        }

        return allRepos;
    };

    // Get unique languages from repositories
    const languages = useMemo(
        () => getUniqueLanguages(repositories),
        [repositories]
    );

    // Apply filters, search, and sort
    const filteredAndSortedRepos = useMemo(() => {
        let filtered = repositories;

        // Apply search
        if (searchQuery.trim()) {
            filtered = searchRepos(filtered, searchQuery);
        }

        // Apply language filter
        if (selectedLanguage !== "all") {
            filtered = filterByLanguage(filtered, selectedLanguage);
        }

        // Apply sorting
        filtered = sortRepos(filtered, sortBy);

        return filtered;
    }, [repositories, searchQuery, selectedLanguage, sortBy]);

    // Calculate pagination
    const pagination = useMemo(
        () =>
            calculatePagination(
                filteredAndSortedRepos.length,
                currentPage,
                config.reposPerPage
            ),
        [filteredAndSortedRepos.length, currentPage]
    );

    // Get current page repositories
    const currentRepos = useMemo(
        () =>
            filteredAndSortedRepos.slice(
                pagination.startIndex,
                pagination.endIndex
            ),
        [filteredAndSortedRepos, pagination.startIndex, pagination.endIndex]
    );

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedLanguage, sortBy]);

    // Clear success message after 5 seconds
    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => setSuccessMessage(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    // CRUD Operation Handlers
    const handleCreateSuccess = (newRepo: GitHubRepository) => {
        setRepositories((prev) => [newRepo, ...prev]);
        setSuccessMessage(`Repository "${newRepo.name}" created successfully!`);
    };

    const handleUpdateSuccess = (updatedRepo: GitHubRepository) => {
        setRepositories((prev) =>
            prev.map((repo) =>
                repo.id === updatedRepo.id ? updatedRepo : repo
            )
        );
        setSuccessMessage(
            `Repository "${updatedRepo.name}" updated successfully!`
        );
    };

    const handleDeleteSuccess = (repoName: string) => {
        setRepositories((prev) =>
            prev.filter((repo) => repo.name !== repoName)
        );
        setSuccessMessage(`Repository "${repoName}" deleted successfully!`);
    };

    const openUpdateModal = (repo: GitHubRepository) => {
        setSelectedRepo(repo);
        setIsUpdateModalOpen(true);
    };

    const openDeleteModal = (repo: GitHubRepository) => {
        setSelectedRepo(repo);
        setIsDeleteModalOpen(true);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (loading) {
        return <Loading message="Loading repositories..." />;
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                    <svg
                        className="w-16 h-16 text-red-500 mx-auto mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Error Loading Data
                    </h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="btn-primary"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    {user && (
                        <div className="flex items-center gap-4">
                            <img
                                src={user.avatar_url}
                                alt={`${user.login}'s avatar`}
                                className="w-20 h-20 rounded-full border-2 border-blue-500"
                            />
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">
                                    {user.name || user.login}
                                </h1>
                                <p className="text-gray-600 mt-1">{user.bio}</p>
                                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                    <span>
                                        {user.public_repos} repositories
                                    </span>
                                    <span>•</span>
                                    <span>{user.followers} followers</span>
                                    <span>•</span>
                                    <span>{user.following} following</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Success Message */}
                {successMessage && (
                    <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 animate-fade-in">
                        <div className="flex items-center gap-3">
                            <svg
                                className="w-5 h-5 text-green-600 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span className="text-sm text-green-800 font-medium">
                                {successMessage}
                            </span>
                            <button
                                onClick={() => setSuccessMessage(null)}
                                className="ml-auto text-green-600 hover:text-green-800"
                                aria-label="Close"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}

                {/* Action Bar with Create Button */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Repositories
                        <span className="ml-2 text-gray-500 text-lg font-normal">
                            ({repositories.length})
                        </span>
                    </h2>
                    <div className="flex gap-3">
                        <Link
                            to="/404-test"
                            className="btn-secondary flex items-center gap-2"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            Test 404
                        </Link>
                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="btn-primary flex items-center gap-2"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                            New Repository
                        </button>
                    </div>
                </div>

                {/* Search and Filter */}
                <SearchFilter
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    selectedLanguage={selectedLanguage}
                    onLanguageChange={setSelectedLanguage}
                    languages={languages}
                    sortBy={sortBy}
                    onSortChange={setSortBy as (sort: string) => void}
                    totalResults={filteredAndSortedRepos.length}
                />

                {/* Repository Grid */}
                {currentRepos.length === 0 ? (
                    <div className="text-center py-12">
                        <svg
                            className="w-16 h-16 text-gray-400 mx-auto mb-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                            />
                        </svg>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            No repositories found
                        </h3>
                        <p className="text-gray-600">
                            Try adjusting your search or filter criteria
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {currentRepos.map((repo) => (
                                <RepoCard
                                    key={repo.id}
                                    repo={repo}
                                    onEdit={openUpdateModal}
                                    onDelete={openDeleteModal}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        {pagination.totalPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={pagination.totalPages}
                                onPageChange={handlePageChange}
                                hasNext={pagination.hasNext}
                                hasPrev={pagination.hasPrev}
                            />
                        )}
                    </>
                )}
            </main>

            {/* Nested Routes Outlet */}
            <Outlet />

            {/* CRUD Modals */}
            <CreateRepoModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSuccess={handleCreateSuccess}
            />

            {selectedRepo && (
                <>
                    <UpdateRepoModal
                        isOpen={isUpdateModalOpen}
                        onClose={() => setIsUpdateModalOpen(false)}
                        onSuccess={handleUpdateSuccess}
                        repository={selectedRepo}
                    />

                    <DeleteRepoModal
                        isOpen={isDeleteModalOpen}
                        onClose={() => setIsDeleteModalOpen(false)}
                        onSuccess={handleDeleteSuccess}
                        repository={selectedRepo}
                    />
                </>
            )}
        </div>
    );
};
