import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI
 */
export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }

    static getDerivedStateFromError(error: Error): Partial<State> {
        // Update state so the next render will show the fallback UI
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        // Log error details for debugging
        console.error("Error Boundary caught an error:", error);
        console.error("Error Info:", errorInfo);

        // Update state with error details
        this.setState({
            error,
            errorInfo,
        });

        // You can also log the error to an error reporting service here
        // Example: logErrorToService(error, errorInfo);
    }

    handleReset = (): void => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null,
        });
    };

    render(): ReactNode {
        if (this.state.hasError) {
            // Custom fallback UI or use the provided one
            if (this.props.fallback) {
                return this.props.fallback;
            }

            // Default error UI
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                    <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl p-8">
                        {/* Error Icon */}
                        <div className="flex justify-center mb-6">
                            <div className="bg-red-100 rounded-full p-4">
                                <svg
                                    className="w-16 h-16 text-red-600"
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
                            </div>
                        </div>

                        {/* Error Message */}
                        <div className="text-center mb-6">
                            <h1 className="text-3xl font-bold text-gray-900 mb-3">
                                Oops! Something went wrong
                            </h1>
                            <p className="text-gray-600 text-lg mb-4">
                                We're sorry, but an unexpected error has
                                occurred. Please try refreshing the page or
                                contact support if the problem persists.
                            </p>
                        </div>

                        {/* Error Details (Development Mode) */}
                        {this.state.error && (
                            <details className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                                <summary className="cursor-pointer font-semibold text-red-800 hover:text-red-900">
                                    View Error Details
                                </summary>
                                <div className="mt-4 space-y-3">
                                    <div>
                                        <h3 className="font-semibold text-red-900 mb-1">
                                            Error Message:
                                        </h3>
                                        <pre className="text-sm text-red-800 bg-white p-3 rounded border border-red-200 overflow-auto">
                                            {this.state.error.toString()}
                                        </pre>
                                    </div>
                                    {this.state.errorInfo && (
                                        <div>
                                            <h3 className="font-semibold text-red-900 mb-1">
                                                Component Stack:
                                            </h3>
                                            <pre className="text-xs text-red-800 bg-white p-3 rounded border border-red-200 overflow-auto max-h-48">
                                                {
                                                    this.state.errorInfo
                                                        .componentStack
                                                }
                                            </pre>
                                        </div>
                                    )}
                                </div>
                            </details>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button
                                onClick={this.handleReset}
                                className="btn-primary"
                                aria-label="Try again"
                            >
                                Try Again
                            </button>
                            <button
                                onClick={() => (window.location.href = "/")}
                                className="btn-secondary"
                                aria-label="Go to home page"
                            >
                                Go to Home
                            </button>
                            <button
                                onClick={() => window.location.reload()}
                                className="btn-secondary"
                                aria-label="Refresh page"
                            >
                                Refresh Page
                            </button>
                        </div>

                        {/* Help Text */}
                        <div className="mt-8 text-center text-sm text-gray-500">
                            <p>
                                If this error persists, please{" "}
                                <a
                                    href="https://github.com"
                                    className="text-blue-600 hover:text-blue-800 underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    report the issue
                                </a>
                                .
                            </p>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
