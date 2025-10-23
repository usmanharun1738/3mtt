import React, { useState } from "react";
import { Modal } from "./Modal";
import githubService from "../api/githubService";
import type { CreateRepoPayload, GitHubRepository } from "../types/github";

interface CreateRepoModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (repo: GitHubRepository) => void;
}

/**
 * Create Repository Modal
 * Allows users to create a new GitHub repository
 */
export const CreateRepoModal: React.FC<CreateRepoModalProps> = ({
    isOpen,
    onClose,
    onSuccess,
}) => {
    const [formData, setFormData] = useState<CreateRepoPayload>({
        name: "",
        description: "",
        homepage: "",
        private: false,
        auto_init: true,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const newRepo = await githubService.createRepository(formData);
            onSuccess(newRepo);
            handleClose();
        } catch (err) {
            console.error("Error creating repository:", err);
            setError(
                "Failed to create repository. Make sure you have a valid GitHub token with proper permissions."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setFormData({
            name: "",
            description: "",
            homepage: "",
            private: false,
            auto_init: true,
        });
        setError(null);
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Create New Repository"
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
                            htmlFor="repo-name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Repository Name{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="repo-name"
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
                            Great repository names are short and memorable.
                        </p>
                    </div>

                    {/* Description */}
                    <div>
                        <label
                            htmlFor="repo-description"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Description
                        </label>
                        <textarea
                            id="repo-description"
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
                            htmlFor="repo-homepage"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Homepage URL
                        </label>
                        <input
                            id="repo-homepage"
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
                                id="repo-private"
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
                                htmlFor="repo-private"
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

                    {/* Initialize with README */}
                    <div className="flex items-start gap-3">
                        <div className="flex items-center h-5">
                            <input
                                id="repo-auto-init"
                                type="checkbox"
                                checked={formData.auto_init}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        auto_init: e.target.checked,
                                    })
                                }
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                            />
                        </div>
                        <div className="flex-1">
                            <label
                                htmlFor="repo-auto-init"
                                className="text-sm font-medium text-gray-900"
                            >
                                Initialize with README
                            </label>
                            <p className="text-xs text-gray-500 mt-1">
                                Add a README file to help people understand your
                                project.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Info Box */}
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
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
                            <p className="font-semibold mb-1">Note:</p>
                            <p>
                                To create repositories, you need a GitHub
                                Personal Access Token with{" "}
                                <code className="bg-blue-100 px-1 py-0.5 rounded">
                                    public_repo
                                </code>{" "}
                                scope. Configure it in your{" "}
                                <code className="bg-blue-100 px-1 py-0.5 rounded">
                                    .env
                                </code>{" "}
                                file.
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
                                Creating...
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
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                                Create Repository
                            </>
                        )}
                    </button>
                </div>
            </form>
        </Modal>
    );
};
