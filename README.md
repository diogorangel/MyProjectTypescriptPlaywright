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

# PDF Document results tests
npm install images-to-pdf


1. Dependency Management
npm install -D @types/images-to-pdf: This attempts to install the TypeScript type definitions for the library. If it says "404 Not Found," it means the library doesn't have official types, and you should stick to the require method we used earlier.

npm list images-to-pdf: Shows the exact version of the library currently installed in your node_modules. This is helpful to verify the installation was successful.

npm uninstall images-to-pdf: Use this if you need to remove the library to try a different version or a different tool.

2. Folder and Environment Preparation
Since your code saves the PDF inside an evidence folder, you need to make sure that folder exists, otherwise, the code might crash:

mkdir evidence: Creates the folder manually from the terminal if it doesn't exist yet.

3. Alternative PDF Tools (The "Corporate" Alternatives)
If you find that images-to-pdf is too simple for your needs, here are other industry-standard commands for documentation:

npm install pdf-lib: A more powerful library if you want to add text, page numbers, or custom headers to your evidence document.

npm install allure-playwright: As mentioned before, this is the "gold standard" for professional reports. It doesn't just make a PDF; it creates a full interactive dashboard.

npx allure generate allure-results --clean -o allure-report: Command to turn your test data into a visual report.

4. Cleaning the Cache (Troubleshooting)
If you still see red lines in VS Code even after installing @types/node and the library, your IDE might be "stuck."

npm cache clean --force: Clears the internal npm cache.

Restarting the TS Server: Press Ctrl + Shift + P in VS Code, type "TypeScript: Restart TS Server", and hit Enter. This usually clears "ghost" errors.
