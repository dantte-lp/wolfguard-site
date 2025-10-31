# Contributing to WolfGuard Website

Thank you for your interest in contributing to the WolfGuard website! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

This project follows the WolfGuard community code of conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

### Our Standards

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

### Prerequisites

- Node.js 22.x or higher
- npm 10.x or higher
- Git
- A GitHub account

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:

```bash
git clone https://github.com/YOUR_USERNAME/wolfguard-site.git
cd wolfguard-site
```

3. Add upstream remote:

```bash
git remote add upstream https://github.com/dantte-lp/wolfguard-site.git
```

## Development Setup

### Install Dependencies

```bash
npm ci
```

### Run Development Server

```bash
npm run dev
```

Access the site at http://localhost:3000

### Build for Production

```bash
npm run build
npm run start
```

### Run Linters

```bash
# ESLint
npm run lint

# Fix linting issues
npm run lint:fix

# Check formatting
npm run format:check

# Fix formatting
npm run format
```

### Type Checking

```bash
npm run type-check
```

## How to Contribute

### Reporting Bugs

Before creating a bug report:

1. Check existing issues to avoid duplicates
2. Collect relevant information (browser, OS, steps to reproduce)
3. Create a new issue using the bug report template

Include:

- Clear, descriptive title
- Detailed description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Environment details

### Suggesting Features

Before suggesting a feature:

1. Check if it's already been suggested
2. Ensure it aligns with project goals
3. Create a new issue using the feature request template

Include:

- Clear, descriptive title
- Detailed description of the feature
- Use case and benefits
- Possible implementation approach
- Alternative solutions considered

### Contributing Code

1. Find an issue to work on or create one
2. Comment on the issue to let others know you're working on it
3. Create a feature branch
4. Make your changes
5. Submit a pull request

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Provide proper type annotations
- Avoid `any` types when possible
- Use interfaces for object shapes
- Use enums for fixed sets of values

### React Components

- Use functional components with hooks
- Follow React best practices
- Use descriptive component names
- Keep components focused and small
- Properly handle loading and error states

### Naming Conventions

- **Files**: kebab-case (e.g., `hero-section.tsx`)
- **Components**: PascalCase (e.g., `HeroSection`)
- **Functions**: camelCase (e.g., `handleClick`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_URL`)
- **Types/Interfaces**: PascalCase (e.g., `UserProfile`)

### Code Style

We use ESLint and Prettier for code formatting:

- Run `npm run lint:fix` before committing
- Run `npm run format` to format code
- Follow existing code patterns
- Add comments for complex logic
- Keep functions small and focused

### File Organization

```
wolfguard-site/
├── app/                # Next.js app directory
├── components/         # React components
│   ├── ui/            # Reusable UI components
│   └── sections/      # Page sections
├── lib/               # Utility functions
├── public/            # Static assets
└── docs/              # Documentation
```

## Commit Guidelines

### Commit Message Format

```
type(scope): subject

body (optional)

footer (optional)
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, no code change)
- **refactor**: Code refactoring
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Build process or auxiliary tool changes
- **ci**: CI/CD changes

### Examples

```bash
feat(hero): add animated background to hero section

fix(navigation): correct mobile menu close button behavior

docs(readme): update installation instructions

style(components): format code with prettier

refactor(api): simplify data fetching logic

perf(images): optimize image loading with next/image

test(utils): add unit tests for date formatting

chore(deps): update dependencies to latest versions

ci(github): add automated deployment workflow
```

### Commit Best Practices

- Use present tense ("add feature" not "added feature")
- Use imperative mood ("move cursor to..." not "moves cursor to...")
- Keep subject line under 50 characters
- Capitalize subject line
- Don't end subject line with period
- Separate subject from body with blank line
- Wrap body at 72 characters
- Explain what and why, not how

## Pull Request Process

### Before Submitting

1. Update your branch with latest upstream changes:

```bash
git fetch upstream
git rebase upstream/master
```

2. Run all checks:

```bash
npm run lint
npm run type-check
npm run build
```

3. Test your changes thoroughly

### Creating a Pull Request

1. Push your branch to your fork:

```bash
git push origin feature/your-feature-name
```

2. Create a pull request on GitHub

3. Fill out the PR template completely

4. Link related issues

### PR Title Format

Follow the same format as commit messages:

```
type(scope): description
```

### PR Description

Include:

- What changes were made
- Why the changes were necessary
- How to test the changes
- Screenshots (for UI changes)
- Breaking changes (if any)

### Review Process

- At least one maintainer must approve
- All CI checks must pass
- All comments must be resolved
- Branch must be up-to-date with master

### After PR Approval

- Maintainers will merge your PR
- Your changes will be deployed automatically
- You'll be credited in the release notes

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Writing Tests

- Write tests for new features
- Update tests for bug fixes
- Aim for high code coverage
- Test edge cases and error conditions
- Use descriptive test names

## Documentation

### Code Documentation

- Add JSDoc comments for complex functions
- Document component props with TypeScript interfaces
- Include usage examples for reusable components

### Project Documentation

- Update README.md for major changes
- Update relevant docs in /docs directory
- Add inline comments for complex logic
- Keep documentation up-to-date with code

## Getting Help

If you need help:

- Check existing documentation
- Search closed issues
- Ask in GitHub discussions
- Contact maintainers

## Recognition

Contributors are recognized in:

- GitHub contributors page
- Release notes
- Project documentation

Thank you for contributing to WolfGuard!
