// Pappa Fresh - Utilities

// Newsletter forms
export function initializeNewsletterForms() {
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

// Contact form
export function initializeContactPage() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            showNotification('Messaggio inviato con successo! Ti risponderemo entro 24 ore.', 'success');
            
            // Reset form
            contactForm.reset();
        });
    }
}

// Blog page
export function initializeBlogPage() {
    // Blog functionality can be added here
    console.log('Blog page initialized');
}

// Utility functions
export function showNotification(message, type = 'info') {
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

export function formatCurrency(amount) {
    return new Intl.NumberFormat('it-IT', {
        style: 'currency',
        currency: 'EUR'
    }).format(amount);
}

// Page initialization helper
export function initializePage(pageName) {
    switch(pageName) {
        case 'home':
            // Home page specific code
            break;
        case 'products':
            // Products page will be initialized by its own module
            break;
        case 'trial':
            // Trial page will be initialized by its own module
            break;
        case 'cart':
            // Cart page will be initialized by its own module
            break;
        case 'checkout':
            // Checkout page will be initialized by its own module
            break;
        case 'chat':
            // Chat page will be initialized by its own module
            break;
        case 'contact':
            initializeContactPage();
            break;
        case 'blog':
            initializeBlogPage();
            break;
    }
}
