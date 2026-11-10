// ***********************************************************
// Component Testing Support File
// This file is loaded automatically before component test files.
// 
// This is a great place to put global configuration and
// behavior that modifies Cypress for component testing.
//
// ***********************************************************

// Import mount command from Cypress React adapter
// This enables cy.mount() for mounting React components in tests
// With framework: 'react' in cypress.config.js, mount is automatically available
// but we import it here to ensure it's properly set up
import { mount } from 'cypress/react';

// Make mount available globally
// Note: With framework: 'react' in config, Cypress auto-provides mount,
// but we register it explicitly to ensure it works in all cases
Cypress.Commands.add('mount', mount);

// Import commands.js using ES2015 syntax:
import './commands'

// Import global styles if needed for component testing
// This ensures components render with proper styling
// Note: Uncomment if you need global styles in component tests
// import '../../src/index.css'

