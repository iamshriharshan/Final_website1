// Pappa Fresh - Trial Calculator

import { dogBreeds, products } from './data.js';
import { CalculatorManager, getRecommendedProducts } from './calculator.js';
import { addToCart } from './cart.js';

// Trial page state
const calculatorManager = new CalculatorManager();

// Trial page initialization
export function initializeTrialPage() {
    populateBreedDropdown();
    initializeCalculatorSteps();
}

export function populateBreedDropdown() {
    const breedSelect = document.getElementById('dog-breed');
    if (!breedSelect) return;
    
    // Clear existing options except the first one
    breedSelect.innerHTML = '<option value="">Seleziona la razza...</option>';
    
    // Add breed options grouped by size
    Object.entries(dogBreeds).forEach(([category, data]) => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = getCategoryLabel(category);
        
        data.breeds.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed;
            option.textContent = breed;
            optgroup.appendChild(option);
        });
        
        breedSelect.appendChild(optgroup);
    });
}

function getCategoryLabel(category) {
    const labels = {
        'toy': 'Razze Toy',
        'small': 'Razze Piccole',
        'medium': 'Razze Medie',
        'large': 'Razze Grandi',
        'giant': 'Razze Giganti',
        'mixed': 'Meticcio/Sconosciuto'
    };
    return labels[category] || category;
}

export function initializeCalculatorSteps() {
    // Step 1 to 2
    const nextStep1 = document.getElementById('next-step-1');
    if (nextStep1) {
        nextStep1.addEventListener('click', function() {
            if (validateStep1()) {
                saveStep1Data();
                showStep(2);
            }
        });
    }
    
    // Step 2 navigation
    const nextStep2 = document.getElementById('next-step-2');
    const backStep2 = document.getElementById('back-step-2');
    
    if (nextStep2) {
        nextStep2.addEventListener('click', function() {
            if (validateStep2()) {
                saveStep2Data();
                calculateAndShowResults();
                showStep(3);
            }
        });
    }
    
    if (backStep2) {
        backStep2.addEventListener('click', () => showStep(1));
    }
    
    // Step 3 navigation
    const backStep3 = document.getElementById('back-step-3');
    if (backStep3) {
        backStep3.addEventListener('click', () => showStep(2));
    }
}

export function validateStep1() {
    const name = document.getElementById('dog-name').value.trim();
    const breed = document.getElementById('dog-breed').value;
    const weight = document.getElementById('dog-weight').value;
    const age = document.getElementById('dog-age').value;
    
    if (!name || !breed || !weight || !age) {
        alert('Per favore compila tutti i campi obbligatori');
        return false;
    }
    
    if (weight < 1 || weight > 100) {
        alert('Il peso deve essere compreso tra 1 e 100 kg');
        return false;
    }
    
    return true;
}

export function validateStep2() {
    const activity = document.getElementById('dog-activity').value;
    const neutered = document.querySelector('input[name="dog-neutered"]:checked');
    const condition = document.getElementById('dog-condition').value;
    
    if (!activity || !neutered || !condition) {
        alert('Per favore compila tutti i campi obbligatori');
        return false;
    }
    
    return true;
}

export function saveStep1Data() {
    const name = document.getElementById('dog-name').value.trim();
    const breed = document.getElementById('dog-breed').value;
    const weight = document.getElementById('dog-weight').value;
    const age = document.getElementById('dog-age').value;
    
    calculatorManager.saveStep1Data(name, breed, weight, age);
}

export function saveStep2Data() {
    const activity = document.getElementById('dog-activity').value;
    const neutered = document.querySelector('input[name="dog-neutered"]:checked').value;
    const condition = document.getElementById('dog-condition').value;
    
    calculatorManager.saveStep2Data(activity, neutered, condition);
}

export function calculateAndShowResults() {
    const results = calculatorManager.calculateResults();
    
    // Update results display
    document.getElementById('result-dog-name').textContent = calculatorManager.getData().name;
    document.getElementById('result-calories').textContent = results.finalCalories;
    document.getElementById('result-portions').textContent = results.portions;
    document.getElementById('result-monthly').textContent = results.monthlyPortions;
    document.getElementById('result-cost').textContent = (results.monthlyPortions * 6.66).toFixed(2);
    
    // Show recommended products
    showRecommendedProducts();
}

export function showRecommendedProducts() {
    const recommendedIds = calculatorManager.getRecommendedProducts();
    const currentData = calculatorManager.getData();
    const monthlyPortions = currentData.results?.monthlyPortions || 1;
    
    console.log('Calculator data:', currentData);
    console.log('Monthly portions:', monthlyPortions);
    
    const container = document.getElementById('recommended-product-container');
    if (!container) return;
    
    container.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h4 class="card-title mb-4">
                    <i class="bi bi-star-fill text-warning me-2"></i>
                    <span data-i18n="trial.recommended.title">Prodotti Raccomandati per</span> ${currentData.name}
                </h4>
                <div class="row" id="recommended-products">
                    ${products.filter(p => recommendedIds.includes(p.id)).map(product => `
                        <div class="col-md-6 col-lg-4 mb-3">
                            <div class="card h-100">
                                <img src="${product.image}" class="card-img-top" alt="${product.name}" style="height: 200px; object-fit: contain; background: #fff;">
                                <div class="card-body">
                                    <div class="product-badge" data-i18n="trial.recommended.badge">Raccomandato</div>
                                    <h6 class="card-title">${product.name}</h6>
                                    <p class="card-text small">${product.description}</p>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <span class="price-tag">€${product.price.toFixed(2)}</span>
                                        <small class="text-muted">${product.weight}</small>
                                    </div>
                                    <button class="btn btn-primary btn-sm w-100 mt-2" onclick="addToCartWithQuantity(${product.id}, ${monthlyPortions})">
                                        <i class="bi bi-cart-plus me-1"></i>Aggiungi ${monthlyPortions} pezzi
                                    </button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="text-center mt-4">
                    <a href="product.html?recommended=${recommendedIds.join(',')}" class="btn btn-outline-primary">
                        <i class="bi bi-eye me-2"></i>Vedi Tutti i Prodotti
                    </a>
                </div>
            </div>
        </div>
    `;
    
    // Apply translations to the newly added content
    import('./language.js').then(({ updateTranslations }) => {
        updateTranslations();
    });
}

export function showStep(stepNumber) {
    // Hide all steps
    document.querySelectorAll('.calculator-step').forEach(step => {
        step.classList.remove('active');
    });
    
    // Show current step
    document.getElementById(`step-${stepNumber}`).classList.add('active');
    
    // Update step indicator
    document.querySelectorAll('.step').forEach((step, index) => {
        step.classList.remove('active', 'completed');
        if (index + 1 === stepNumber) {
            step.classList.add('active');
        } else if (index + 1 < stepNumber) {
            step.classList.add('completed');
        }
    });
    
    calculatorManager.setStep(stepNumber);
}

export function getCalculatorManager() {
    return calculatorManager;
}

// Helper function to add products with specific quantity
export function addToCartWithQuantity(productId, quantity) {
    console.log(`Adding product ${productId} with quantity ${quantity}`);
    
    // Ensure quantity is a valid number
    const validQuantity = parseInt(quantity) || 1;
    
    // Call the global addToCart function
    if (window.addToCart) {
        window.addToCart(productId, validQuantity);
    } else {
        console.error('addToCart function not available globally');
        // Fallback: add with quantity 1
        if (window.addToCart) {
            window.addToCart(productId, 1);
        }
    }
}
