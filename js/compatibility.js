// Pappa Fresh - Compatibility Layer
// This file ensures all functions are available globally for HTML files

import { 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    processPayment 
} from './cart.js';

import { 
    askQuestion,
    detectLanguage 
} from './chat.js';

import { 
    showStep, 
    validateStep1, 
    validateStep2, 
    saveStep1Data, 
    saveStep2Data, 
    calculateAndShowResults,
    addToCartWithQuantity
} from './trial.js';

// Export functions to global scope for backward compatibility
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.processPayment = processPayment;
window.askQuestion = askQuestion;
window.detectLanguage = detectLanguage;
window.showStep = showStep;
window.validateStep1 = validateStep1;
window.validateStep2 = validateStep2;
window.saveStep1Data = saveStep1Data;
window.saveStep2Data = saveStep2Data;
window.calculateAndShowResults = calculateAndShowResults;
window.addToCartWithQuantity = addToCartWithQuantity;

// Export other utility functions that might be needed
window.showNotification = function(message, type = 'info') {
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
};
