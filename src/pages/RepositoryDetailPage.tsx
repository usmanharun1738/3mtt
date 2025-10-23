import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import githubService from "../api/githubService";
import type { GitHubRepository } from "../types/github";
import { Loading } from "../components/Loading";
import { formatDate, formatNumber, getRelativeTime } from "../utils/helpers";

export const RepositoryDetailPage: React.FC = () => {
    const { repoName } = useParams<{ repoName: string }>();
    const navigate = useNavigate();
    const [repository, setRepository] = useState<GitHubRepository | null>(null);
    const [languages, setLanguages] = useState<Record<string, number>>({});
    const [readme, setReadme] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<
        "overview" | "readme" | "languages"
    >("overview");

    useEffect(() => {
        const fetchRepositoryDetails = async () => {
            if (!repoName) {
                setError("Repository name is required");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                const [repoData, languagesData, readmeData] = await Promise.all(
                    [
                        githubService.getRepository(repoName),
                        githubService.getRepositoryLanguages(repoName),
                        githubService.getRepositoryReadme(repoName),
                    ]
                );

                setRepository(repoData);
                setLanguages(languagesData);
                setReadme(readmeData);
            } catch (err) {
                console.error("Error fetching repository details:", err);
                setError(
                    "Failed to load repository details. The repository may not exist."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchRepositoryDetails();
    }, [repoName]);

    // Calculate language percentages
    const calculateLanguagePercentages = () => {
        const total = Object.values(languages).reduce(
            (sum, bytes) => sum + bytes,
            0
        );
        return Object.entries(languages).map(([lang, bytes]) => ({
            language: lang,
            bytes,
            percentage: ((bytes / total) * 100).toFixed(1),
        }));
    };

    const languageStats = calculateLanguagePercentages();

    // Language colors
    const languageColors: Record<string, string> = {
        JavaScript: "#f1e05a",
        TypeScript: "#3178c6",
        Python: "#3572A5",
        Java: "#b07219",
        "C++": "#f34b7d",
        C: "#555555",
        Go: "#00ADD8",
        Rust: "#dea584",
        Ruby: "#701516",
        PHP: "#4F5D95",
        HTML: "#e34c26",
        CSS: "#563d7c",
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Loading message="Loading repository details..." />
            </div>
        );
    }

    if (error || !repository) {
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
                        Repository Not Found
                    </h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <div className="flex gap-3 justify-center">
                        <button
                            onClick={() => navigate(-1)}
                            className="btn-secondary"
                        >
                            Go Back
                        </button>
                        <Link to="/" className="btn-primary">
                            All Repositories
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center gap-4 mb-4">
                        <Link
                            to="/"
                            className="text-blue-600 hover:text-blue-800 flex items-center gap-2 transition-colors"
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
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                />
                            </svg>
                            Back to Repositories
                        </Link>
                    </div>

                    <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-3xl font-bold text-gray-900">
                                    {repository.name}
                                </h1>
                                {repository.private && (
                                    <span className="badge bg-yellow-100 text-yellow-800">
                                        Private
                                    </span>
                                )}
                                {repository.fork && (
                                    <span className="badge bg-gray-100 text-gray-800">
                                        Fork
                                    </span>
                                )}
                            </div>

                            {repository.description && (
                                <p className="text-gray-600 text-lg mb-4">
                                    {repository.description}
                                </p>
                            )}

                            {repository.topics &&
                                repository.topics.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {repository.topics.map((topic) => (
                                            <span
                                                key={topic}
                                                className="badge bg-blue-100 text-blue-800"
                                            >
                                                {topic}
                                            </span>
                                        ))}
                                    </div>
                                )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <a
                                href={repository.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary inline-flex items-center gap-2"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                View on GitHub
                            </a>
                            {repository.homepage && (
                                <a
                                    href={repository.homepage}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-secondary inline-flex items-center gap-2"
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
                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                        />
                                    </svg>
                                    Visit Website
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Stats Bar */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-wrap gap-6 text-sm">
                        <div className="flex items-center gap-2">
                            <svg
                                className="w-5 h-5 text-gray-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="font-semibold">
                                {formatNumber(repository.stargazers_count)}
                            </span>
                            <span className="text-gray-600">stars</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <svg
                                className="w-5 h-5 text-gray-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="font-semibold">
                                {formatNumber(repository.forks_count)}
                            </span>
                            <span className="text-gray-600">forks</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <svg
                                className="w-5 h-5 text-gray-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="font-semibold">
                                {formatNumber(repository.open_issues_count)}
                            </span>
                            <span className="text-gray-600">issues</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <svg
                                className="w-5 h-5 text-gray-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="text-gray-600">
                                Updated {getRelativeTime(repository.updated_at)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex gap-8" role="tablist">
                        <button
                            onClick={() => setActiveTab("overview")}
                            className={`py-4 border-b-2 font-medium transition-colors ${
                                activeTab === "overview"
                                    ? "border-blue-600 text-blue-600"
                                    : "border-transparent text-gray-600 hover:text-gray-900"
                            }`}
                            role="tab"
                            aria-selected={
                                activeTab === "overview" ? "true" : "false"
                            }
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveTab("readme")}
                            className={`py-4 border-b-2 font-medium transition-colors ${
                                activeTab === "readme"
                                    ? "border-blue-600 text-blue-600"
                                    : "border-transparent text-gray-600 hover:text-gray-900"
                            }`}
                            role="tab"
                            aria-selected={
                                activeTab === "readme" ? "true" : "false"
                            }
                        >
                            README
                        </button>
                        <button
                            onClick={() => setActiveTab("languages")}
                            className={`py-4 border-b-2 font-medium transition-colors ${
                                activeTab === "languages"
                                    ? "border-blue-600 text-blue-600"
                                    : "border-transparent text-gray-600 hover:text-gray-900"
                            }`}
                            role="tab"
                            aria-selected={
                                activeTab === "languages" ? "true" : "false"
                            }
                        >
                            Languages
                        </button>
                    </nav>
                </div>
            </div>

            {/* Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Overview Tab */}
                {activeTab === "overview" && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            {/* About Section */}
                            <div className="card p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">
                                    About
                                </h2>
                                <dl className="space-y-3">
                                    {repository.description && (
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">
                                                Description
                                            </dt>
                                            <dd className="mt-1 text-gray-900">
                                                {repository.description}
                                            </dd>
                                        </div>
                                    )}

                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">
                                            Default Branch
                                        </dt>
                                        <dd className="mt-1 text-gray-900">
                                            {repository.default_branch}
                                        </dd>
                                    </div>

                                    {repository.language && (
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">
                                                Primary Language
                                            </dt>
                                            <dd className="mt-1 text-gray-900">
                                                {repository.language}
                                            </dd>
                                        </div>
                                    )}

                                    {repository.license && (
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">
                                                License
                                            </dt>
                                            <dd className="mt-1 text-gray-900">
                                                {repository.license.name}
                                            </dd>
                                        </div>
                                    )}

                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">
                                            Repository Size
                                        </dt>
                                        <dd className="mt-1 text-gray-900">
                                            {(repository.size / 1024).toFixed(
                                                2
                                            )}{" "}
                                            MB
                                        </dd>
                                    </div>

                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">
                                            Created
                                        </dt>
                                        <dd className="mt-1 text-gray-900">
                                            {formatDate(repository.created_at)}
                                        </dd>
                                    </div>

                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">
                                            Last Updated
                                        </dt>
                                        <dd className="mt-1 text-gray-900">
                                            {formatDate(repository.updated_at)}
                                        </dd>
                                    </div>

                                    {repository.pushed_at && (
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">
                                                Last Pushed
                                            </dt>
                                            <dd className="mt-1 text-gray-900">
                                                {formatDate(
                                                    repository.pushed_at
                                                )}
                                            </dd>
                                        </div>
                                    )}
                                </dl>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Stats Card */}
                            <div className="card p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">
                                    Statistics
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">
                                            Stars
                                        </span>
                                        <span className="font-semibold text-gray-900">
                                            {formatNumber(
                                                repository.stargazers_count
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">
                                            Watchers
                                        </span>
                                        <span className="font-semibold text-gray-900">
                                            {formatNumber(
                                                repository.watchers_count
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">
                                            Forks
                                        </span>
                                        <span className="font-semibold text-gray-900">
                                            {formatNumber(
                                                repository.forks_count
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">
                                            Open Issues
                                        </span>
                                        <span className="font-semibold text-gray-900">
                                            {formatNumber(
                                                repository.open_issues_count
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Owner Card */}
                            <div className="card p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">
                                    Owner
                                </h3>
                                <a
                                    href={repository.owner.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors"
                                >
                                    <img
                                        src={repository.owner.avatar_url}
                                        alt={repository.owner.login}
                                        className="w-12 h-12 rounded-full"
                                    />
                                    <div>
                                        <div className="font-semibold text-gray-900">
                                            {repository.owner.login}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            View Profile
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                )}

                {/* README Tab */}
                {activeTab === "readme" && (
                    <div className="card p-6">
                        {readme ? (
                            <div className="prose max-w-none">
                                <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
                                    {readme}
                                </pre>
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <svg
                                    className="w-16 h-16 text-gray-400 mx-auto mb-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    No README found
                                </h3>
                                <p className="text-gray-600">
                                    This repository doesn't have a README file.
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {/* Languages Tab */}
                {activeTab === "languages" && (
                    <div className="card p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">
                            Languages Used
                        </h2>
                        {languageStats.length > 0 ? (
                            <div className="space-y-6">
                                {/* Language Bar */}
                                <div className="h-4 flex rounded-lg overflow-hidden">
                                    {languageStats.map(
                                        ({ language, percentage }) => {
                                            const bgColor =
                                                languageColors[language] ||
                                                "#8b5cf6";
                                            return (
                                                <div
                                                    key={language}
                                                    className="language-bar"
                                                    style={{
                                                        width: `${percentage}%`,
                                                        backgroundColor:
                                                            bgColor,
                                                    }}
                                                    title={`${language}: ${percentage}%`}
                                                />
                                            );
                                        }
                                    )}
                                </div>

                                {/* Language List */}
                                <div className="space-y-3">
                                    {languageStats.map(
                                        ({ language, bytes, percentage }) => {
                                            const bgColor =
                                                languageColors[language] ||
                                                "#8b5cf6";
                                            return (
                                                <div
                                                    key={language}
                                                    className="flex items-center justify-between"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div
                                                            className="language-dot"
                                                            style={{
                                                                backgroundColor:
                                                                    bgColor,
                                                            }}
                                                        />
                                                        <span className="font-medium text-gray-900">
                                                            {language}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <span className="text-gray-600">
                                                            {formatNumber(
                                                                bytes
                                                            )}{" "}
                                                            bytes
                                                        </span>
                                                        <span className="font-semibold text-gray-900 w-16 text-right">
                                                            {percentage}%
                                                        </span>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <svg
                                    className="w-16 h-16 text-gray-400 mx-auto mb-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                                    />
                                </svg>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    No language data available
                                </h3>
                                <p className="text-gray-600">
                                    GitHub hasn't detected any languages for
                                    this repository.
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};
