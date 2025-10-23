import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

/**
 * 404 Not Found Page
 * Displays when a user navigates to a non-existent route
 */
export const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [countdown, setCountdown] = useState(10);

    // Auto-redirect countdown
    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    navigate("/");
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
            <div className="max-w-2xl w-full">
                {/* 404 Illustration */}
                <div className="text-center mb-8">
                    <div className="inline-block relative">
                        {/* Large 404 Text */}
                        <h1 className="text-9xl md:text-[12rem] font-bold text-gray-200 select-none">
                            404
                        </h1>

                        {/* Animated Icon */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="relative">
                                <svg
                                    className="w-32 h-32 text-blue-600 animate-bounce"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Card */}
                <div className="card p-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Page Not Found
                    </h2>

                    <p className="text-lg text-gray-600 mb-6">
                        Oops! The page you're looking for doesn't exist or has
                        been moved.
                    </p>

                    {/* Current Path Display */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                        <p className="text-sm text-gray-500 mb-1">
                            You tried to access:
                        </p>
                        <code className="text-sm font-mono text-gray-900 break-all">
                            {location.pathname}
                        </code>
                    </div>

                    {/* Auto-redirect Notice */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <div className="flex items-center justify-center gap-2 text-blue-800">
                            <svg
                                className="w-5 h-5 animate-spin"
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
                            <span className="text-sm font-medium">
                                Redirecting to home in {countdown} second
                                {countdown !== 1 ? "s" : ""}...
                            </span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            to="/"
                            className="btn-primary inline-flex items-center justify-center gap-2"
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
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                />
                            </svg>
                            Go to Home
                        </Link>

                        <button
                            onClick={() => navigate(-1)}
                            className="btn-secondary inline-flex items-center justify-center gap-2"
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
                            Go Back
                        </button>
                    </div>

                    {/* Helpful Links */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <p className="text-sm text-gray-600 mb-3">
                            You might be looking for:
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 text-sm">
                            <Link
                                to="/"
                                className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                            >
                                All Repositories
                            </Link>
                            <span className="text-gray-400">•</span>
                            <Link
                                to="/error-test"
                                className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                            >
                                Error Test
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Fun Facts */}
                <div className="mt-8 text-center">
                    <details className="text-sm text-gray-500">
                        <summary className="cursor-pointer hover:text-gray-700 inline-flex items-center gap-2">
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
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            Did you know?
                        </summary>
                        <div className="mt-3 text-gray-600">
                            <p>
                                The 404 error code means "Not Found" and is part
                                of the HTTP status code standard. It was named
                                after room 404 at CERN where the World Wide Web
                                was created... just kidding! That's actually a
                                myth. The real reason is simply that 4xx codes
                                indicate client errors.
                            </p>
                        </div>
                    </details>
                </div>
            </div>
        </div>
    );
};
