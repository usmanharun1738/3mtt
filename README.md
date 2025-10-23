# GitHub Portfolio - Repository Manager

A modern, feature-rich web application for managing and showcasing your GitHub repositories with full CRUD operations, built with React, TypeScript, and Tailwind CSS.

![GitHub Portfolio Screenshot](https://img.shields.io/badge/Built%20with-React%20%7C%20TypeScript%20%7C%20Vite-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🚀 Live Demo

[View Live Demo](#) <!-- Add your deployed URL here -->

## ✨ Features

### Core Features

-   📊 **Repository Listing** - Display all your GitHub repositories with pagination (20 per page)
-   🔍 **Advanced Search & Filter** - Search by name/description and filter by programming language
-   🎯 **Sorting Options** - Sort by last updated, name, stars, or forks
-   📄 **Repository Details** - Comprehensive view with README, languages breakdown, and statistics
-   🔀 **Nested Routing** - Clean URL structure with React Router
-   ⚠️ **Error Boundary** - Graceful error handling with fallback UI
-   🚫 **404 Page** - Custom not found page with auto-redirect

### BONUS Features ⭐

-   ✏️ **Create Repository** - Create new repositories directly from the UI
-   📝 **Update Repository** - Edit repository details (name, description, homepage, privacy)
-   🗑️ **Delete Repository** - Delete repositories with confirmation safety
-   🎨 **Modal Interface** - Beautiful, accessible modal dialogs for all CRUD operations
-   ✅ **Real-time Updates** - Instant UI updates without page refresh
-   🎉 **Success Notifications** - Toast notifications for all operations

### UI/UX Features

-   🎨 **Modern Design** - Clean, professional interface with Tailwind CSS
-   📱 **Responsive Layout** - Works seamlessly on desktop, tablet, and mobile
-   ♿ **Accessibility** - WCAG compliant with proper ARIA labels and keyboard navigation
-   🌈 **Loading States** - Smooth loading indicators
-   🎭 **Animations** - Subtle transitions and fade-in effects

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

-   **Node.js** (v18 or higher)
-   **npm** or **yarn**
-   **Git**
-   A **GitHub Personal Access Token** (for API access)

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/github-portfolio.git
cd github-portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your GitHub credentials:

```env
VITE_GITHUB_USERNAME=your-github-username
VITE_GITHUB_TOKEN=your-github-personal-access-token
```

#### How to Generate a GitHub Personal Access Token:

1. Go to [GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a descriptive name (e.g., "GitHub Portfolio App")
4. Select scopes:
    - ✅ `public_repo` (for creating/updating/deleting repositories)
    - ✅ `read:user` (for reading user information)
5. Click "Generate token"
6. **Copy the token immediately** (you won't be able to see it again!)
7. Paste it in your `.env` file

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📦 Build for Production

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## 🚀 Deployment

### Pre-Deployment Checklist

Before deploying, make sure:
- ✅ Your `.env` file is NOT committed (check `.gitignore`)
- ✅ You have a `.env.example` file for reference
- ✅ All features work locally (`npm run dev`)
- ✅ Build succeeds without errors (`npm run build`)
- ✅ You have your GitHub Personal Access Token ready
- ✅ Your GitHub username is correct in `.env`

### Deploy to Vercel

1. Install Vercel CLI:

```bash
npm install -g vercel
```

2. Deploy:

```bash
vercel
```

3. Set environment variables in Vercel dashboard:
    - `VITE_GITHUB_USERNAME`
    - `VITE_GITHUB_TOKEN`

### Deploy to Netlify

#### Option 1: Netlify CLI (Recommended)

1. Install Netlify CLI:

```bash
npm install -g netlify-cli
```

2. Login to Netlify:

```bash
netlify login
```

3. Initialize and deploy:

```bash
# Build the project first
npm run build

# Deploy to Netlify
netlify deploy --prod
```

4. Follow the prompts and set your site name

5. Set environment variables in Netlify dashboard:
   - Go to Site settings → Environment variables
   - Add `VITE_GITHUB_USERNAME`
   - Add `VITE_GITHUB_TOKEN`

#### Option 2: GitHub Integration (Easiest)

1. Push your code to GitHub:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/github-portfolio.git
git push -u origin main
```

2. Go to [Netlify Dashboard](https://app.netlify.com/)

3. Click "Add new site" → "Import an existing project"

4. Connect to GitHub and select your repository

5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Environment variables**: Add `VITE_GITHUB_USERNAME` and `VITE_GITHUB_TOKEN`

6. Click "Deploy site"

7. Your site will be live at `https://your-site-name.netlify.app`

#### Option 3: Manual Drag & Drop

1. Build the project:

```bash
npm run build
```

2. Go to [Netlify Drop](https://app.netlify.com/drop)

3. Drag and drop the `dist` folder

4. Set environment variables in Site settings after deployment

**Note**: For all methods, remember to set your environment variables in the Netlify dashboard under Site settings → Environment variables.

## 📁 Project Structure

```
github-portfolio/
├── public/              # Static assets
├── src/
│   ├── api/            # API integration
│   │   ├── client.ts   # Axios configuration
│   │   └── githubService.ts  # GitHub API methods
│   ├── components/     # Reusable components
│   │   ├── CreateRepoModal.tsx
│   │   ├── DeleteRepoModal.tsx
│   │   ├── UpdateRepoModal.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── Layout.tsx
│   │   ├── Loading.tsx
│   │   ├── Modal.tsx
│   │   ├── Pagination.tsx
│   │   ├── RepoCard.tsx
│   │   └── SearchFilter.tsx
│   ├── config/         # App configuration
│   │   └── config.ts
│   ├── pages/          # Page components
│   │   ├── ErrorTestPage.tsx
│   │   ├── NotFoundPage.tsx
│   │   ├── NotFoundTestPage.tsx
│   │   ├── RepositoriesPage.tsx
│   │   └── RepositoryDetailPage.tsx
│   ├── types/          # TypeScript types
│   │   └── github.ts
│   ├── utils/          # Utility functions
│   │   └── helpers.ts
│   ├── App.tsx         # Main app component
│   ├── App.css         # Custom styles
│   ├── index.css       # Global styles
│   └── main.tsx        # App entry point
├── .env                # Environment variables (not committed)
├── .env.example        # Environment template
├── package.json        # Dependencies
├── tailwind.config.js  # Tailwind configuration
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## 🔧 Technologies Used

-   **React 19** - UI library
-   **TypeScript** - Type safety
-   **Vite** - Build tool and dev server
-   **React Router DOM** - Client-side routing
-   **Axios** - HTTP client for API calls
-   **Tailwind CSS** - Utility-first CSS framework
-   **GitHub REST API v3** - Repository data

## 🎯 Key Features Explained

### Repository Listing with Pagination

-   Fetches all repositories from GitHub API
-   Client-side pagination (20 repos per page)
-   Displays repository cards with stats, topics, and metadata

### Search & Filter

-   Real-time search across repository names and descriptions
-   Filter by programming language
-   Sort by multiple criteria (updated, name, stars, forks)

### Repository Details

-   **Overview Tab**: Complete metadata, stats, topics, and links
-   **README Tab**: Rendered Markdown content from repository
-   **Languages Tab**: Visual breakdown of languages used with percentages

### CRUD Operations

-   **Create**: Form with validation for new repositories
-   **Update**: Edit repository details with pre-filled data
-   **Delete**: Confirmation dialog with safety checks (type repo name)
-   All operations update the UI instantly without page refresh

### Error Handling

-   Error Boundary catches React errors
-   Dedicated error test page to demonstrate error recovery
-   User-friendly error messages with retry options

### 404 Not Found

-   Custom 404 page with countdown auto-redirect
-   Test page with example invalid routes
-   Graceful handling of non-existent routes

## 🧪 Testing Features

-   **Error Boundary Test**: Visit `/error-test` to see error handling
-   **404 Test**: Visit `/404-test` to test not found page functionality

## 📝 API Rate Limits

GitHub API has rate limits:

-   **Authenticated**: 5,000 requests per hour
-   **Unauthenticated**: 60 requests per hour

**Always use a GitHub token** for better rate limits and access to CRUD operations.

## 🔒 Security Notes

-   Never commit your `.env` file with sensitive tokens
-   GitHub tokens are sensitive - regenerate if exposed
-   Use environment variables for all secrets
-   Tokens are included in API headers, never in URLs

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Your Name**

-   GitHub: [@yourusername](https://github.com/yourusername)
-   Portfolio: [your-portfolio.com](#)

## 🙏 Acknowledgments

-   [GitHub REST API Documentation](https://docs.github.com/en/rest)
-   [React Documentation](https://react.dev/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [Vite](https://vitejs.dev/)

## 📸 Screenshots

### Repository Listing

![Repository Listing](#)

### Repository Details

![Repository Details](#)

### CRUD Operations

![Create Repository](#)
![Edit Repository](#)
![Delete Repository](#)

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**

Currently, two official plugins are available:

-   [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
-   [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
    globalIgnores(["dist"]),
    {
        files: ["**/*.{ts,tsx}"],
        extends: [
            // Other configs...

            // Remove tseslint.configs.recommended and replace with this
            tseslint.configs.recommendedTypeChecked,
            // Alternatively, use this for stricter rules
            tseslint.configs.strictTypeChecked,
            // Optionally, add this for stylistic rules
            tseslint.configs.stylisticTypeChecked,

            // Other configs...
        ],
        languageOptions: {
            parserOptions: {
                project: ["./tsconfig.node.json", "./tsconfig.app.json"],
                tsconfigRootDir: import.meta.dirname,
            },
            // other options...
        },
    },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
    globalIgnores(["dist"]),
    {
        files: ["**/*.{ts,tsx}"],
        extends: [
            // Other configs...
            // Enable lint rules for React
            reactX.configs["recommended-typescript"],
            // Enable lint rules for React DOM
            reactDom.configs.recommended,
        ],
        languageOptions: {
            parserOptions: {
                project: ["./tsconfig.node.json", "./tsconfig.app.json"],
                tsconfigRootDir: import.meta.dirname,
            },
            // other options...
        },
    },
]);
```
