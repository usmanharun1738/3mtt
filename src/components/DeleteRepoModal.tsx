import React, { useState } from "react";
import { Modal } from "./Modal";
import githubService from "../api/githubService";
import type { GitHubRepository } from "../types/github";

interface DeleteRepoModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (repoName: string) => void;
    repository: GitHubRepository;
}

/**
 * Delete Repository Modal
 * Allows users to delete a GitHub repository with confirmation
 */
export const DeleteRepoModal: React.FC<DeleteRepoModalProps> = ({
    isOpen,
    onClose,
    onSuccess,
    repository,
}) => {
    const [confirmText, setConfirmText] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDelete = async () => {
        if (confirmText !== repository.name) {
            setError(
                "Repository name does not match. Please type the exact repository name."
            );
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await githubService.deleteRepository(repository.name);
            onSuccess(repository.name);
            handleClose();
        } catch (err) {
            console.error("Error deleting repository:", err);
            setError(
                "Failed to delete repository. Make sure you have proper permissions."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setConfirmText("");
        setError(null);
        onClose();
    };

    const isConfirmValid = confirmText === repository.name;

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Delete Repository"
            size="md"
        >
            <div>
                {/* Danger Warning */}
                <div className="mb-6 bg-red-50 border border-red-300 rounded-lg p-4">
                    <div className="flex gap-3">
                        <svg
                            className="w-6 h-6 text-red-600 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                        <div>
                            <h3 className="text-sm font-bold text-red-900 mb-2">
                                Warning: This action is irreversible!
                            </h3>
                            <p className="text-sm text-red-800">
                                Deleting this repository will permanently remove
                                all its contents, including:
                            </p>
                            <ul className="list-disc list-inside mt-2 text-sm text-red-800 space-y-1 ml-2">
                                <li>All source code and commit history</li>
                                <li>
                                    All issues, pull requests, and discussions
                                </li>
                                <li>All releases and packages</li>
                                <li>All wikis and GitHub Pages sites</li>
                                <li>All webhooks and integrations</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex gap-3">
                            <svg
                                className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <div className="text-sm text-red-800">{error}</div>
                        </div>
                    </div>
                )}

                {/* Repository Info */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-start gap-3">
                        <svg
                            className="w-6 h-6 text-gray-600 flex-shrink-0 mt-1"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                        >
                            <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z" />
                        </svg>
                        <div className="flex-1">
                            <h4 className="text-lg font-semibold text-gray-900">
                                {repository.name}
                            </h4>
                            {repository.description && (
                                <p className="text-sm text-gray-600 mt-1">
                                    {repository.description}
                                </p>
                            )}
                            <div className="flex gap-4 mt-3 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                    <svg
                                        className="w-4 h-4"
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
                                    </svg>
                                    <span>{repository.stargazers_count}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <svg
                                        className="w-4 h-4"
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                                    </svg>
                                    <span>{repository.forks_count}</span>
                                </div>
                                {repository.language && (
                                    <div className="flex items-center gap-1">
                                        <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                                        <span>{repository.language}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Confirmation Input */}
                <div className="mb-6">
                    <label
                        htmlFor="confirm-delete"
                        className="block text-sm font-medium text-gray-900 mb-2"
                    >
                        Please type{" "}
                        <code className="bg-gray-100 px-2 py-1 rounded font-mono text-red-600">
                            {repository.name}
                        </code>{" "}
                        to confirm:
                    </label>
                    <input
                        id="confirm-delete"
                        type="text"
                        value={confirmText}
                        onChange={(e) => {
                            setConfirmText(e.target.value);
                            setError(null);
                        }}
                        className="input"
                        placeholder={repository.name}
                        autoComplete="off"
                        autoFocus
                    />
                    {confirmText && !isConfirmValid && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                            <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path d="M8 0a8 8 0 110 16A8 8 0 018 0zM6.854 5.146a.5.5 0 10-.708.708L7.293 7 5.146 9.146a.5.5 0 10.708.708L8 7.707l2.146 2.147a.5.5 0 00.708-.708L8.707 7l2.147-2.146a.5.5 0 00-.708-.708L8 6.293 5.854 4.146z" />
                            </svg>
                            Repository name does not match
                        </p>
                    )}
                    {isConfirmValid && (
                        <p className="mt-2 text-sm text-green-600 flex items-center gap-1">
                            <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path d="M8 0a8 8 0 110 16A8 8 0 018 0zm3.854 6.354a.5.5 0 00-.708-.708L7 9.793 4.854 7.646a.5.5 0 10-.708.708l2.5 2.5a.5.5 0 00.708 0l4.5-4.5z" />
                            </svg>
                            Repository name confirmed
                        </p>
                    )}
                </div>

                {/* Info Box */}
                <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex gap-3">
                        <svg
                            className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <div className="text-sm text-blue-800">
                            <p className="font-semibold mb-1">
                                Need to preserve your data?
                            </p>
                            <p>
                                Consider archiving the repository instead of
                                deleting it. Archived repositories are read-only
                                and can be unarchived later.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
                    <button
                        type="button"
                        onClick={handleClose}
                        className="btn-secondary"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        disabled={loading || !isConfirmValid}
                    >
                        {loading ? (
                            <>
                                <svg
                                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                                Deleting...
                            </>
                        ) : (
                            <>
                                <svg
                                    className="w-5 h-5 inline mr-2"
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
                                I understand, delete this repository
                            </>
                        )}
                    </button>
                </div>
            </div>
        </Modal>
    );
};
