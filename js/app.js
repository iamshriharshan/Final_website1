// Pappa Fresh - Main Application Module

import { updateCartBadge } from './cart.js';
import { setInitialLanguage, initializeLanguageSwitcher, updateTranslations } from './language.js';
import { initializeProductsPage } from './products.js';
import { initializeTrialPage } from './trial.js';
import { initializeCartPage } from './cart.js';
import { initializeCheckoutPage } from './cart.js';
import { initializeChatPage } from './chat.js';
import { initializePage } from './utils.js';

// Global state
let currentStep = 1;
let calculatorData = {};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    updateCartBadge();
    setInitialLanguage();
    initializeLanguageSwitcher();
    
    // Page-specific initializations
    const currentPage = document.body.getAttribute('data-page');
    
    switch(currentPage) {
        case 'home':
            // Home page specific code
            break;
        case 'products':
            initializeProductsPage();
            break;
        case 'trial':
            initializeTrialPage();
            break;
        case 'cart':
            initializeCartPage();
            break;
        case 'checkout':
            initializeCheckoutPage();
            break;
        case 'chat':
            initializeChatPage();
            break;
        case 'contact':
            initializePage('contact');
            break;
        case 'blog':
            initializePage('blog');
            break;
    }
    
    // Initialize newsletter forms
    initializeNewsletterForms();
}

// Newsletter forms
function initializeNewsletterForms() {
    const newsletterForms = document.querySelectorAll('#newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                showNotification('Iscrizione completata! Grazie per esserti iscritto alla nostra newsletter.', 'success');
                this.reset();
            }
        });
    });
}

// Utility function for notifications (fallback)
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'success' ? 'success' : 'info'} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Export global functions for backward compatibility
window.showNotification = showNotification;
