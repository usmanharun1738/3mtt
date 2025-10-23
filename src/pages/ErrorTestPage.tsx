import React, { useState } from "react";
import { Link } from "react-router-dom";

/**
 * Component that throws an error when button is clicked
 * Used to test the Error Boundary functionality
 */
const ErrorTrigger: React.FC = () => {
    const [shouldThrow, setShouldThrow] = useState(false);

    if (shouldThrow) {
        // This will trigger the Error Boundary
        throw new Error(
            "This is a test error thrown intentionally to demonstrate Error Boundary!"
        );
    }

    return (
        <div className="text-center">
            <button onClick={() => setShouldThrow(true)} className="btn-danger">
                Trigger Error
            </button>
            <p className="mt-3 text-sm text-gray-600">
                Click this button to simulate an application error
            </p>
        </div>
    );
};

/**
 * Error Test Page
 * Demonstrates Error Boundary functionality
 */
export const ErrorTestPage: React.FC = () => {
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
                        Error Boundary Test
                    </h1>
                    <p className="text-gray-600 mt-2">
                        This page demonstrates how the Error Boundary handles
                        unexpected errors
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
                                What is an Error Boundary?
                            </h2>
                        </div>
                        <div className="space-y-3 text-gray-700">
                            <p>
                                Error Boundaries are React components that catch
                                JavaScript errors anywhere in their child
                                component tree, log those errors, and display a
                                fallback UI instead of the component tree that
                                crashed.
                            </p>
                            <p>Error boundaries catch errors during:</p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li>Rendering</li>
                                <li>Lifecycle methods</li>
                                <li>
                                    Constructors of the whole tree below them
                                </li>
                            </ul>
                            <p className="text-sm text-gray-600 mt-4">
                                <strong>Note:</strong> Error boundaries do NOT
                                catch errors for:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-gray-600">
                                <li>Event handlers</li>
                                <li>
                                    Asynchronous code (e.g., setTimeout or
                                    requestAnimationFrame callbacks)
                                </li>
                                <li>Server side rendering</li>
                                <li>
                                    Errors thrown in the error boundary itself
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Test Card */}
                    <div className="card p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <svg
                                className="w-8 h-8 text-red-600"
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
                            <h2 className="text-2xl font-bold text-gray-900">
                                Test Error Boundary
                            </h2>
                        </div>
                        <div className="space-y-4">
                            <p className="text-gray-700">
                                Click the button below to simulate an error in
                                the application. The Error Boundary will catch
                                the error and display a user-friendly error
                                page.
                            </p>

                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
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
                                        <p className="font-semibold mb-1">
                                            Warning
                                        </p>
                                        <p>
                                            This will intentionally crash the
                                            component to demonstrate error
                                            handling. You can recover from the
                                            error using the buttons on the error
                                            page.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <ErrorTrigger />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Implementation Details */}
                <div className="card p-6 mt-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Implementation
                    </h2>
                    <div className="space-y-4 text-gray-700">
                        <p>Our Error Boundary implementation includes:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>
                                <strong>Error Detection:</strong> Automatically
                                catches errors in child components
                            </li>
                            <li>
                                <strong>Fallback UI:</strong> Displays a
                                user-friendly error page instead of a blank
                                screen
                            </li>
                            <li>
                                <strong>Error Details:</strong> Shows error
                                message and component stack (helpful for
                                debugging)
                            </li>
                            <li>
                                <strong>Recovery Options:</strong> Provides
                                buttons to try again, go home, or refresh
                            </li>
                            <li>
                                <strong>Console Logging:</strong> Logs errors to
                                the console for debugging
                            </li>
                            <li>
                                <strong>Customizable:</strong> Accepts a custom
                                fallback UI via props
                            </li>
                        </ul>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                            <p className="text-blue-900 font-semibold mb-2">
                                Best Practices:
                            </p>
                            <ul className="list-disc list-inside space-y-1 text-blue-800 text-sm ml-4">
                                <li>
                                    Place Error Boundaries at strategic points
                                    in your component tree
                                </li>
                                <li>
                                    Don't wrap every component - use them at
                                    logical boundaries
                                </li>
                                <li>
                                    Log errors to an error tracking service in
                                    production
                                </li>
                                <li>
                                    Provide helpful recovery options to users
                                </li>
                                <li>Test your error boundaries regularly</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Code Example */}
                <div className="card p-6 mt-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Usage Example
                    </h2>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-auto text-sm">
                        {`import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <YourComponent />
    </ErrorBoundary>
  );
}`}
                    </pre>
                </div>
            </main>
        </div>
    );
};
