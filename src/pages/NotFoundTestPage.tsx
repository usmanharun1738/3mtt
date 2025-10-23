import React from "react";
import { Link } from "react-router-dom";

/**
 * 404 Test Page
 * Provides links to test the 404 Not Found page
 */
export const NotFoundTestPage: React.FC = () => {
    const testRoutes = [
        "/this-page-does-not-exist",
        "/random-invalid-route",
        "/nonexistent-repository",
        "/repository/this-repo-does-not-exist-12345",
        "/some/deeply/nested/route/that/does/not/exist",
    ];

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
                            Back to Home
                        </Link>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        404 Page Test
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Test the 404 Not Found page by clicking on any invalid
                        route below
                    </p>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Information Card */}
                    <div className="card p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <svg
                                className="w-8 h-8 text-blue-600"
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
                            <h2 className="text-2xl font-bold text-gray-900">
                                About 404 Pages
                            </h2>
                        </div>
                        <div className="space-y-3 text-gray-700">
                            <p>
                                A 404 page (or "Not Found" page) is displayed
                                when a user tries to access a page that doesn't
                                exist on your website. This can happen when:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li>The URL is typed incorrectly</li>
                                <li>A page has been moved or deleted</li>
                                <li>A link is broken or outdated</li>
                                <li>A user follows a bad external link</li>
                            </ul>
                            <p className="mt-4">
                                <strong>Good 404 pages should:</strong>
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li>Clearly explain what happened</li>
                                <li>Maintain the site's branding and design</li>
                                <li>Provide helpful navigation options</li>
                                <li>Include a search function or site map</li>
                                <li>Use friendly, human language</li>
                                <li>Optionally include humor or personality</li>
                            </ul>
                        </div>
                    </div>

                    {/* Test Card */}
                    <div className="card p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <svg
                                className="w-8 h-8 text-purple-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                                />
                            </svg>
                            <h2 className="text-2xl font-bold text-gray-900">
                                Test Invalid Routes
                            </h2>
                        </div>
                        <p className="text-gray-700 mb-4">
                            Click on any of these links to see the 404 page in
                            action:
                        </p>
                        <div className="space-y-2">
                            {testRoutes.map((route, index) => (
                                <Link
                                    key={index}
                                    to={route}
                                    className="block p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors group"
                                >
                                    <div className="flex items-center justify-between">
                                        <code className="text-sm font-mono text-gray-900">
                                            {route}
                                        </code>
                                        <svg
                                            className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                                            />
                                        </svg>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <div className="mt-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
                            <div className="flex gap-3">
                                <svg
                                    className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5"
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
                                <div className="text-sm text-purple-800">
                                    <p className="font-semibold mb-1">Note</p>
                                    <p>
                                        The 404 page will automatically redirect
                                        you back to the home page after 10
                                        seconds. You can also use the navigation
                                        buttons to return manually.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="card p-6 mt-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Our 404 Page Features
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="flex gap-3">
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <svg
                                        className="w-6 h-6 text-blue-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">
                                    Beautiful Design
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Eye-catching gradient background and smooth
                                    animations
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                    <svg
                                        className="w-6 h-6 text-green-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">
                                    Auto-Redirect
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Automatically redirects to home after 10
                                    seconds
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <svg
                                        className="w-6 h-6 text-purple-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 10V3L4 14h7v7l9-11h-7z"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">
                                    Quick Navigation
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Multiple buttons to return to valid pages
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                                    <svg
                                        className="w-6 h-6 text-yellow-600"
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
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">
                                    Clear Information
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Shows the invalid URL that was attempted
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                    <svg
                                        className="w-6 h-6 text-red-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">
                                    Responsive Design
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Works perfectly on all screen sizes
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                                    <svg
                                        className="w-6 h-6 text-indigo-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">
                                    Fun Element
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Includes a fun fact to engage users
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
