import React, { useState, useEffect } from "react";
import { Modal } from "./Modal";
import githubService from "../api/githubService";
import type { UpdateRepoPayload, GitHubRepository } from "../types/github";

interface UpdateRepoModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (repo: GitHubRepository) => void;
    repository: GitHubRepository;
}

/**
 * Update Repository Modal
 * Allows users to update an existing GitHub repository's details
 */
export const UpdateRepoModal: React.FC<UpdateRepoModalProps> = ({
    isOpen,
    onClose,
    onSuccess,
    repository,
}) => {
    const [formData, setFormData] = useState<UpdateRepoPayload>({
        name: repository.name,
        description: repository.description || "",
        homepage: repository.homepage || "",
        private: repository.private,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Update form data when repository prop changes
    useEffect(() => {
        if (isOpen) {
            setFormData({
                name: repository.name,
                description: repository.description || "",
                homepage: repository.homepage || "",
                private: repository.private,
            });
            setError(null);
        }
    }, [repository, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const updatedRepo = await githubService.updateRepository(
                repository.name,
                formData
            );
            onSuccess(updatedRepo);
            onClose();
        } catch (err) {
            console.error("Error updating repository:", err);
            setError(
                "Failed to update repository. Make sure you have proper permissions."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setError(null);
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Update Repository"
            size="lg"
        >
            <form onSubmit={handleSubmit}>
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

                <div className="space-y-4">
                    {/* Repository Name */}
                    <div>
                        <label
                            htmlFor="update-repo-name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Repository Name{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="update-repo-name"
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                            }
                            className="input"
                            placeholder="my-awesome-project"
                            required
                            pattern="^[a-zA-Z0-9._-]+$"
                            title="Only letters, numbers, dots, hyphens, and underscores are allowed"
                        />
                        <p className="mt-1 text-xs text-gray-500">
                            Changing the repository name will change its URL.
                        </p>
                    </div>

                    {/* Description */}
                    <div>
                        <label
                            htmlFor="update-repo-description"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Description
                        </label>
                        <textarea
                            id="update-repo-description"
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    description: e.target.value,
                                })
                            }
                            className="input min-h-[100px] resize-y"
                            placeholder="A short description of your project..."
                            rows={3}
                        />
                    </div>

                    {/* Homepage */}
                    <div>
                        <label
                            htmlFor="update-repo-homepage"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Homepage URL
                        </label>
                        <input
                            id="update-repo-homepage"
                            type="url"
                            value={formData.homepage}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    homepage: e.target.value,
                                })
                            }
                            className="input"
                            placeholder="https://example.com"
                        />
                    </div>

                    {/* Private Repository */}
                    <div className="flex items-start gap-3">
                        <div className="flex items-center h-5">
                            <input
                                id="update-repo-private"
                                type="checkbox"
                                checked={formData.private}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        private: e.target.checked,
                                    })
                                }
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                            />
                        </div>
                        <div className="flex-1">
                            <label
                                htmlFor="update-repo-private"
                                className="text-sm font-medium text-gray-900"
                            >
                                Private repository
                            </label>
                            <p className="text-xs text-gray-500 mt-1">
                                Make this repository private. Only you and
                                people you explicitly share it with will have
                                access.
                            </p>
                        </div>
                    </div>

                    {/* Current Stats - Read Only Info */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">
                            Current Repository Stats
                        </h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-gray-600">Stars:</span>
                                <span className="ml-2 font-medium text-gray-900">
                                    {repository.stargazers_count}
                                </span>
                            </div>
                            <div>
                                <span className="text-gray-600">Forks:</span>
                                <span className="ml-2 font-medium text-gray-900">
                                    {repository.forks_count}
                                </span>
                            </div>
                            <div>
                                <span className="text-gray-600">Watchers:</span>
                                <span className="ml-2 font-medium text-gray-900">
                                    {repository.watchers_count}
                                </span>
                            </div>
                            <div>
                                <span className="text-gray-600">
                                    Open Issues:
                                </span>
                                <span className="ml-2 font-medium text-gray-900">
                                    {repository.open_issues_count}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Warning Box */}
                <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex gap-3">
                        <svg
                            className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5"
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
                        <div className="text-sm text-yellow-800">
                            <p className="font-semibold mb-1">Important:</p>
                            <p>
                                Renaming a repository will redirect references
                                to the old name, but you should update local
                                clones and remote URLs manually.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 justify-end mt-6 pt-4 border-t border-gray-200">
                    <button
                        type="button"
                        onClick={handleClose}
                        className="btn-secondary"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={loading || !formData.name}
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
                                Updating...
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
                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                    />
                                </svg>
                                Update Repository
                            </>
                        )}
                    </button>
                </div>
            </form>
        </Modal>
    );
};
