// Pappa Fresh - Cart Management

import { products } from './data.js';
import { setCookie, getCookie, removeCookie } from './cookie-utils.js';

// Cart state
let cart = JSON.parse(getCookie('pappa-cart') || '[]');

// Cart functionality
export function addToCart(productId, recommendedQuantity = null) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        // If recommended quantity is provided, add it to existing quantity; otherwise increment by 1
        existingItem.quantity = existingItem.quantity + (recommendedQuantity || 1);
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            weight: product.weight,
            quantity: recommendedQuantity || 1
        });
    }
    
    setCookie('pappa-cart', JSON.stringify(cart), 30); // Store for 30 days
    updateCartBadge();
    
    // Show success message with quantity
    const quantity = recommendedQuantity || 1;
    const quantityText = quantity > 1 ? ` (${quantity} pezzi)` : '';
    showNotification(`${product.name} aggiunto al carrello!${quantityText}`, 'success');
}

export function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    setCookie('pappa-cart', JSON.stringify(cart), 30); // Store for 30 days
    updateCartBadge();
    
    if (document.body.getAttribute('data-page') === 'cart') {
        loadCartItems();
    }
}

export function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        setCookie('pappa-cart', JSON.stringify(cart), 30); // Store for 30 days
        updateCartBadge();
        
        if (document.body.getAttribute('data-page') === 'cart') {
            loadCartItems();
        }
    }
}

export function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    if (!badge) return;
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (totalItems > 0) {
        badge.textContent = totalItems;
        badge.classList.remove('d-none');
    } else {
        badge.classList.add('d-none');
    }
}

export function getCart() {
    return cart;
}

export function clearCart() {
    cart = [];
    removeCookie('pappa-cart');
    updateCartBadge();
}

export function getCartTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

export function getCartItemCount() {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Cart page functionality
export function initializeCartPage() {
    loadCartItems();
}

export function loadCartItems() {
    const cartItemsBody = document.getElementById('cart-items-body');
    const emptyCart = document.getElementById('empty-cart');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const continueShoppingBtn = document.getElementById('continue-shopping-btn');
    const orderSummaryCard = document.getElementById('order-summary-card');
    
    if (cart.length === 0) {
        if (emptyCart) emptyCart.style.display = 'block';
        if (cartItemsContainer) cartItemsContainer.style.display = 'none';
        if (continueShoppingBtn) continueShoppingBtn.style.display = 'none';
        if (orderSummaryCard) orderSummaryCard.style.display = 'none';
        return;
    }
    
    if (emptyCart) emptyCart.style.display = 'none';
    if (cartItemsContainer) cartItemsContainer.style.display = 'block';
    if (continueShoppingBtn) continueShoppingBtn.style.display = 'block';
    if (orderSummaryCard) orderSummaryCard.style.display = 'block';
    
    if (cartItemsBody) {
        cartItemsBody.innerHTML = cart.map(item => `
            <tr>
                <td>
                    <div class="d-flex align-items-center">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image me-3">
                        <div>
                            <h6 class="mb-1">${item.name}</h6>
                            <small class="text-muted">${item.weight}</small>
                        </div>
                    </div>
                </td>
                <td>€${item.price.toFixed(2)}</td>
                <td>
                    <div class="quantity-control">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">
                            <i class="bi bi-dash"></i>
                        </button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">
                            <i class="bi bi-plus"></i>
                        </button>
                    </div>
                </td>
                <td>€${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                    <button class="btn btn-outline-danger btn-sm" onclick="removeFromCart(${item.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }
    
    updateOrderSummary();
}

export function updateOrderSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal >= 39 ? 0 : 4.90;
    const total = subtotal + shipping;
    
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping-cost');
    const totalElement = document.getElementById('total');
    
    if (subtotalElement) subtotalElement.textContent = `€${subtotal.toFixed(2)}`;
    if (shippingElement) shippingElement.textContent = shipping === 0 ? 'Gratuita' : `€${shipping.toFixed(2)}`;
    if (totalElement) totalElement.textContent = `€${total.toFixed(2)}`;
}

// Checkout functionality
export function initializeCheckoutPage() {
    loadCheckoutData();
}

export function loadCheckoutData() {
    const urlParams = new URLSearchParams(window.location.search);
    const purchaseType = urlParams.get('type') || 'single';
    
    // Update purchase type display
    const purchaseTypeText = document.getElementById('purchase-type-text');
    const purchaseTypeAlert = document.getElementById('purchase-type-alert');
    
    if (purchaseType === 'subscription') {
        if (purchaseTypeText) purchaseTypeText.textContent = 'Abbonamento - Risparmia 10%';
        if (purchaseTypeAlert) purchaseTypeAlert.className = 'alert alert-success mb-4';
    }
    
    // Load cart items in checkout
    loadCheckoutItems(purchaseType);
}

export function loadCheckoutItems(purchaseType = 'single') {
    const container = document.getElementById('checkout-items');
    if (!container) return;
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = purchaseType === 'subscription' ? subtotal * 0.1 : 0;
    const shipping = 0; // Free shipping for checkout
    const total = subtotal - discount + shipping;
    
    container.innerHTML = cart.map(item => `
        <div class="d-flex justify-content-between align-items-center mb-2">
            <div class="d-flex align-items-center">
                <img src="${item.image}" alt="${item.name}" class="checkout-item-image me-2">
                <div>
                    <small class="fw-bold">${item.name}</small>
                    <br><small class="text-muted">Qty: ${item.quantity}</small>
                </div>
            </div>
            <small>€${(item.price * item.quantity).toFixed(2)}</small>
        </div>
    `).join('');
    
    // Update totals
    const checkoutSubtotal = document.getElementById('checkout-subtotal');
    const checkoutDiscount = document.getElementById('checkout-discount');
    const checkoutShipping = document.getElementById('checkout-shipping');
    const checkoutTotal = document.getElementById('checkout-total');
    const discountRow = document.getElementById('discount-row');
    
    if (checkoutSubtotal) checkoutSubtotal.textContent = `€${subtotal.toFixed(2)}`;
    if (checkoutShipping) checkoutShipping.textContent = 'Gratuita';
    if (checkoutTotal) checkoutTotal.textContent = `€${total.toFixed(2)}`;
    
    if (discount > 0) {
        if (checkoutDiscount) checkoutDiscount.textContent = `-€${discount.toFixed(2)}`;
        if (discountRow) discountRow.style.display = 'flex';
    }
}

// Process payment (mock function)
export function processPayment() {
    const button = document.getElementById('complete-order');
    const buttonText = document.getElementById('button-text');
    const spinner = document.getElementById('spinner');
    
    // Validate form
    const form = document.getElementById('shipping-form');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    // Check terms acceptance
    const terms = document.getElementById('terms');
    if (!terms.checked) {
        alert('Devi accettare i termini e condizioni per procedere');
        return;
    }
    
    // Show loading state
    if (button) button.disabled = true;
    if (buttonText) buttonText.textContent = 'Elaborazione...';
    if (spinner) spinner.classList.remove('d-none');
    
    // Simulate payment processing
    setTimeout(() => {
        // Clear cart
        clearCart();
        
        // Redirect to success page
        window.location.href = 'order-success.html';
    }, 2000);
}

// Utility function for notifications
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
