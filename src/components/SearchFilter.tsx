import React from "react";

interface SearchFilterProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    selectedLanguage: string;
    onLanguageChange: (language: string) => void;
    languages: string[];
    sortBy: string;
    onSortChange: (sort: string) => void;
    totalResults: number;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
    searchQuery,
    onSearchChange,
    selectedLanguage,
    onLanguageChange,
    languages,
    sortBy,
    onSortChange,
    totalResults,
}) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
                {/* Search Input */}
                <div className="flex-1">
                    <label
                        htmlFor="search"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Search Repositories
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg
                                className="h-5 w-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                        <input
                            id="search"
                            type="search"
                            placeholder="Search by name or description..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="input pl-10"
                            aria-label="Search repositories by name or description"
                        />
                    </div>
                </div>

                {/* Language Filter */}
                <div className="w-full md:w-48">
                    <label
                        htmlFor="language"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Language
                    </label>
                    <select
                        id="language"
                        value={selectedLanguage}
                        onChange={(e) => onLanguageChange(e.target.value)}
                        className="input"
                        aria-label="Filter repositories by programming language"
                    >
                        <option value="all">All Languages</option>
                        {languages.map((lang) => (
                            <option key={lang} value={lang}>
                                {lang}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Sort */}
                <div className="w-full md:w-48">
                    <label
                        htmlFor="sort"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Sort By
                    </label>
                    <select
                        id="sort"
                        value={sortBy}
                        onChange={(e) => onSortChange(e.target.value)}
                        className="input"
                        aria-label="Sort repositories"
                    >
                        <option value="updated">Last Updated</option>
                        <option value="name">Name</option>
                        <option value="stars">Stars</option>
                        <option value="forks">Forks</option>
                    </select>
                </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-gray-600">
                Showing <span className="font-semibold">{totalResults}</span>{" "}
                {totalResults === 1 ? "repository" : "repositories"}
            </div>
        </div>
    );
};
