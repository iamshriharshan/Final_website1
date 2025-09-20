// Pappa Fresh - Products Management

import { products } from './data.js';
import { getCurrentLanguage, getProductTranslation } from './language.js';
import { addToCart } from './cart.js';

// Products page initialization
export function initializeProductsPage() {
    // Load initial products
    loadProducts();
    
    // Initialize filters
    initializeProductFilters();
    
    // Show nutrition plan if coming from calculator
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('from') === 'calculator') {
        showNutritionPlan();
    }
    
    // Listen for language changes
    document.addEventListener('languageChanged', function(e) {
        loadProducts(); // Reload products with new language
    });
}

export function loadProducts(filter = 'all', recommendedIds = []) {
    const container = document.getElementById('products-container');
    if (!container) return;
    
    let filteredProducts = products;
    if (filter !== 'all') {
        filteredProducts = products.filter(product => {
            const categories = product.category.split(',');
            return categories.includes(filter);
        });
    }
    
    // Clear existing content
    container.innerHTML = '';
    
    // Add products
    filteredProducts.forEach(product => {
        const isRecommended = recommendedIds.includes(product.id);
        const productName = getProductTranslation(product, 'name');
        const productDescription = getProductTranslation(product, 'description');
        const ingredients = getCurrentLanguage() === 'en' ? product.ingredientsEn : product.ingredients;
        
        container.innerHTML += `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card product-card h-100" data-product-id="${product.id}">
                    ${isRecommended ? '<div class="product-badge">Raccomandato</div>' : ''}
                    <img src="${product.image}" class="card-img-top product-img-contain" alt="${productName}">
                    <div class="card-body">
                        <h5 class="card-title">${productName}</h5>
                        <p class="card-text">${productDescription}</p>
                        <p class="text-muted small">
                            <strong>Ingredienti:</strong> 
                            ${ingredients.join(', ')}
                        </p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="price-tag">€${product.price.toFixed(2)}</div>
                            <small class="text-muted">${product.weight}</small>
                        </div>
                        <button class="btn btn-primary w-100 mt-2" onclick="addToCart(${product.id})">
                            <i class="bi bi-cart-plus me-2"></i>Aggiungi al Carrello
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}

export function initializeProductFilters() {
    const filterButtons = document.querySelectorAll('[data-filter]');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter products
            const filter = this.getAttribute('data-filter');
            loadProducts(filter);
        });
    });
}

export function showNutritionPlan() {
    const section = document.getElementById('nutrition-plan-section');
    if (!section) return;

    section.style.display = 'block';
    section.innerHTML = `
        <div class="alert alert-success">
            <div class="container">
                <h4><i class="bi bi-star-fill text-warning me-2"></i>Piano Nutrizionale Personalizzato</h4>
                <p class="mb-0">Abbiamo selezionato i prodotti più adatti in base al tuo calcolo</p>
            </div>
        </div>
    `;
}

export function getProductById(id) {
    return products.find(p => p.id === id);
}

export function getProductsByCategory(category) {
    return products.filter(p => p.category === category);
}

export function getProductsByFilter(filter) {
    if (filter === 'all') return products;
    return products.filter(p => {
        const categories = p.category.split(',');
        return categories.includes(filter);
    });
}

