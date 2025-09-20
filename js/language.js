// Pappa Fresh - Language Management

import { translations, products } from './data.js';
import { setCookie, getCookie } from './cookie-utils.js';

// Global language state
let currentLanguage = 'it';

// Language switcher
export function initializeLanguageSwitcher() {
    const langSwitches = document.querySelectorAll('.lang-switch');
    langSwitches.forEach(switcher => {
        switcher.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });
}

export function switchLanguage(lang) {
    currentLanguage = lang;
    
    // Update active language indicator
    document.querySelectorAll('.lang-switch').forEach(switcher => {
        switcher.classList.remove('active');
        if (switcher.getAttribute('data-lang') === lang) {
            switcher.classList.add('active');
        }
    });
    
    // Save language preference
    setCookie('preferred-language', lang, 365); // Store for 1 year
    
    // Update translations
    updateTranslations();
    
    // Reload products if on products page
    if (document.body.getAttribute('data-page') === 'products') {
        // Trigger product reload (this will be handled by the products module)
        const event = new CustomEvent('languageChanged', { detail: { language: lang } });
        document.dispatchEvent(event);
    }
    
    // Update dynamic content
    updateDynamicContent();
    
    // Handle chat language switching if on chat page
    if (document.body.getAttribute('data-page') === 'chat') {
        // Dynamically import and call chat language handler
        import('./chat.js').then(({ handleLanguageSwitch }) => {
            handleLanguageSwitch();
        }).catch(error => {
            console.log('Chat module not available:', error);
        });
    }
}

export function setInitialLanguage() {
    const savedLanguage = getCookie('preferred-language');
    if (savedLanguage) {
        currentLanguage = savedLanguage;
        // Update active language indicator
        document.querySelectorAll('.lang-switch').forEach(switcher => {
            switcher.classList.remove('active');
            if (switcher.getAttribute('data-lang') === savedLanguage) {
                switcher.classList.add('active');
            }
        });
        // Apply translations to match the selected language
        updateTranslations();
        updateDynamicContent();
    }
}

export function getCurrentLanguage() {
    return currentLanguage;
}

export function updateDynamicContent() {
    // Update product names and descriptions
    document.querySelectorAll('.product-card').forEach(card => {
        const productId = card.getAttribute('data-product-id');
        const product = products.find(p => p.id === parseInt(productId));
        if (product) {
            const nameEl = card.querySelector('.card-title');
            const descEl = card.querySelector('.card-text');
            if (nameEl) nameEl.textContent = currentLanguage === 'en' ? product.nameEn : product.name;
            if (descEl) descEl.textContent = currentLanguage === 'en' ? product.descriptionEn : product.description;
        }
    });
    
    // Update buttons
    document.querySelectorAll('[data-i18n-dynamic]').forEach(element => {
        const key = element.getAttribute('data-i18n-dynamic');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
}

export function updateTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
    
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.placeholder = translations[currentLanguage][key];
        }
    });
}

export function getTranslation(key) {
    return translations[currentLanguage] && translations[currentLanguage][key] 
        ? translations[currentLanguage][key] 
        : key;
}

export function getProductTranslation(product, field) {
    if (currentLanguage === 'en') {
        return product[field + 'En'] || product[field];
    }
    return product[field];
}
