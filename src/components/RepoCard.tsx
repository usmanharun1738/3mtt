import React from "react";
import { Link } from "react-router-dom";
import type { GitHubRepository } from "../types/github";
import { formatDate, getRelativeTime } from "../utils/helpers";

interface RepoCardProps {
    repo: GitHubRepository;
    onEdit?: (repo: GitHubRepository) => void;
    onDelete?: (repo: GitHubRepository) => void;
}

export const RepoCard: React.FC<RepoCardProps> = ({
    repo,
    onEdit,
    onDelete,
}) => {
    const languageColors: Record<string, string> = {
        JavaScript: "bg-yellow-400",
        TypeScript: "bg-blue-600",
        Python: "bg-blue-500",
        Java: "bg-orange-600",
        "C++": "bg-pink-600",
        C: "bg-gray-600",
        Go: "bg-cyan-500",
        Rust: "bg-orange-800",
        Ruby: "bg-red-600",
        PHP: "bg-indigo-600",
        HTML: "bg-orange-500",
        CSS: "bg-blue-400",
    };

    const languageColor =
        repo.language && languageColors[repo.language]
            ? languageColors[repo.language]
            : "bg-gray-500";

    return (
        <article className="card hover:shadow-lg transition-shadow">
            <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-3">
                    <Link
                        to={`/repository/${repo.name}`}
                        className="flex-1 min-w-0"
                    >
                        <h2 className="text-xl font-bold text-blue-700 hover:text-blue-800 truncate transition-colors">
                            {repo.name}
                        </h2>
                    </Link>

                    <div className="flex items-center gap-2 flex-shrink-0">
                        {repo.private && (
                            <span className="badge bg-yellow-100 text-yellow-800">
                                Private
                            </span>
                        )}

                        {/* Edit/Delete Actions */}
                        {(onEdit || onDelete) && (
                            <div className="flex gap-1">
                                {onEdit && (
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onEdit(repo);
                                        }}
                                        className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                        title="Edit repository"
                                        aria-label="Edit repository"
                                    >
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                            />
                                        </svg>
                                    </button>
                                )}

                                {onDelete && (
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onDelete(repo);
                                        }}
                                        className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                        title="Delete repository"
                                        aria-label="Delete repository"
                                    >
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                            />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Description */}
                {repo.description && (
                    <p className="text-gray-600 mb-4 line-clamp-2 min-h-[3rem]">
                        {repo.description}
                    </p>
                )}

                {/* Topics */}
                {repo.topics && repo.topics.length > 0 && (
                    <div
                        className="flex flex-wrap gap-2 mb-4"
                        role="list"
                        aria-label="Repository topics"
                    >
                        {repo.topics.slice(0, 5).map((topic) => (
                            <span
                                key={topic}
                                className="badge bg-blue-100 text-blue-800"
                                role="listitem"
                            >
                                {topic}
                            </span>
                        ))}
                        {repo.topics.length > 5 && (
                            <span className="badge bg-gray-100 text-gray-600">
                                +{repo.topics.length - 5} more
                            </span>
                        )}
                    </div>
                )}

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    {repo.language && (
                        <div
                            className="flex items-center gap-1.5"
                            title={repo.language}
                        >
                            <span
                                className={`w-3 h-3 rounded-full ${languageColor}`}
                                aria-hidden="true"
                            ></span>
                            <span>{repo.language}</span>
                        </div>
                    )}

                    {repo.stargazers_count > 0 && (
                        <div
                            className="flex items-center gap-1.5"
                            title="Stars"
                        >
                            <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span>{repo.stargazers_count}</span>
                        </div>
                    )}

                    {repo.forks_count > 0 && (
                        <div
                            className="flex items-center gap-1.5"
                            title="Forks"
                        >
                            <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span>{repo.forks_count}</span>
                        </div>
                    )}

                    {repo.open_issues_count > 0 && (
                        <div
                            className="flex items-center gap-1.5"
                            title="Open Issues"
                        >
                            <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span>{repo.open_issues_count}</span>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t">
                    <span title={formatDate(repo.updated_at)}>
                        Updated {getRelativeTime(repo.updated_at)}
                    </span>

                    {repo.license && (
                        <span
                            className="flex items-center gap-1"
                            title={repo.license.name}
                        >
                            <svg
                                className="w-3 h-3"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            {repo.license.name}
                        </span>
                    )}
                </div>
            </div>
        </article>
    );
};
