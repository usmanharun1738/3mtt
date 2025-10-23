import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { RepositoriesPage } from "./pages/RepositoriesPage";
import { RepositoryDetailPage } from "./pages/RepositoryDetailPage";
import { ErrorTestPage } from "./pages/ErrorTestPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { NotFoundTestPage } from "./pages/NotFoundTestPage";
import "./App.css";

function App() {
    return (
        <ErrorBoundary>
            <Router>
                <Routes>
                    <Route path="/" element={<RepositoriesPage />} />
                    <Route
                        path="/repository/:repoName"
                        element={<RepositoryDetailPage />}
                    />
                    <Route path="/error-test" element={<ErrorTestPage />} />
                    <Route path="/404-test" element={<NotFoundTestPage />} />
                    {/* Catch-all route for 404 - must be last */}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Router>
        </ErrorBoundary>
    );
}

export default App;
