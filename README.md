#Author : @diogorangel (Diogo Rangel)
My Project: TypeScript with Playwright
🎯 Project Purpose
This project is a high-quality automated testing framework designed to validate both Web UI and API layers. By using Playwright with TypeScript, it demonstrates best practices such as:

Page Object Model (POM) for UI maintainability.

API Request Context for fast and reliable backend testing.

Environment management (using .env files).

Comprehensive Evidence Gathering (screenshots, videos, and traces).

🚀 Setup & Initialization
Commands used to build and maintain the environment.

Bash
# Update npm to the latest version to avoid dependency conflicts
npm install -g npm@latest

# Standard interactive command to initialize a new Playwright project
# Use this if you want to choose options manually (Language, Folders, etc.)
npm init playwright@latest

# Fast-track initialization: sets TypeScript and Chromium as default without prompts
npm init playwright@latest -- --yes --lang=TypeScript --browser=chromium
🧪 Running Tests
Different ways to execute your test suites depending on the need.

Bash
# Run all test files in the project
npx playwright test

# Execute only a specific UI test file
npx playwright test tests/example.spec.ts

# Execute only the API test suite
npx playwright test tests/api/booking.spec.ts

# Run tests in 'Headed' mode (opens the browser window to watch execution)
npx playwright test --headed tests/example.spec.ts
🔍 Debugging & Evidence
Tools to identify failures and generate documentation.

Bash
# UI Mode: Opens a graphical interface for time-travel debugging and step-by-step inspection
npx playwright test --ui

# Trace Mode: Records a full trace of the test (network, snapshots, console) 
# Best for investigating flaky tests or providing deep evidence
npx playwright test --trace on

# View HTML Report: Opens the professional report generated after the test run
npx playwright show-report
💡 Pro-Tips for this Project
Evidence: Screenshots are automatically saved in the evidence/ folder as defined in the test scripts.

Environment: Make sure to create a .env file in the root directory based on the variables required for API authentication.