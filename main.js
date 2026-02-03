// This file serves as the main JavaScript entry point for the application.
// It initializes the application and handles global event listeners and state management.

import { initializeFeeds } from './feeds.js';
import { setupMedicalDashboard } from './medical.js';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializeFeeds();
    setupMedicalDashboard();
});