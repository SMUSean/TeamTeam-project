import { defineConfig } from "cypress";
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'node:path';
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // ============================================================
  // E2E TESTING CONFIGURATION
  // ============================================================
  // This configuration remains unchanged from the original setup
  // to ensure existing E2E tests (ecommerce.cy.js, faunaFloraFunga.cy.js)
  // continue to work without modification.
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // Base URL for E2E tests - frontend runs on port 3080
    baseUrl: 'http://localhost:3080',
    // Support file for E2E tests
    supportFile: 'cypress/support/e2e.js',
  },

  // ============================================================
  // COMPONENT TESTING CONFIGURATION
  // ============================================================
  // Added component testing support for testing React components in isolation.
  // This should not affect existing E2E tests.
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
      // Configure Vite inline instead of importing vite.config.js
      // This prevents Cypress from trying to test the config file
      viteConfig: {
        plugins: [react(), svgr(), tailwindcss()],
        resolve: {
          alias: {
            '@': path.resolve(process.cwd(), 'src')
          }
        }
      },
    },
    // Support file for component tests
    supportFile: 'cypress/support/component.js',
    // Spec pattern for component tests - explicitly excludes config files
    specPattern: 'cypress/component/**/*.cy.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      // Component test setup can be added here if needed
    },
  },
});
