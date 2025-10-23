import React from "react";

interface LoadingSpinnerProps {
    size?: "sm" | "md" | "lg";
    className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = "md",
    className = "",
}) => {
    const sizeClasses = {
        sm: "w-4 h-4 border-2",
        md: "w-8 h-8 border-3",
        lg: "w-12 h-12 border-4",
    };

    return (
        <div
            className={`inline-block ${sizeClasses[size]} border-blue-600 border-t-transparent rounded-full animate-spin ${className}`}
            role="status"
            aria-label="Loading"
        >
            <span className="sr-only">Loading...</span>
        </div>
    );
};

interface LoadingProps {
    message?: string;
}

export const Loading: React.FC<LoadingProps> = ({ message = "Loading..." }) => {
    return (
        <div
            className="flex flex-col items-center justify-center min-h-[400px] gap-4"
            role="alert"
            aria-live="polite"
        >
            <LoadingSpinner size="lg" />
            <p className="text-gray-600 text-lg">{message}</p>
        </div>
    );
};
