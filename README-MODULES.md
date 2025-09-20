# Pappa Fresh - Modular JavaScript Structure

This document describes the new modular JavaScript architecture that replaces the monolithic `script.js` file.

## Overview

The JavaScript code has been split into logical, manageable modules that are easier to maintain and debug. Each module handles a specific aspect of the application:

## Module Structure

### Core Modules

#### `js/data.js`
- **Purpose**: Contains all data constants and configurations
- **Exports**: 
  - `products` - Product catalog
  - `dogBreeds` - Dog breed information with metabolic factors
  - `dailyGramsTable` - Reference table for daily food requirements
  - `staticRecommendations` - Product recommendations based on various criteria
  - `translations` - Internationalization data (Italian/English)

#### `js/calculator.js`
- **Purpose**: Handles nutrition calculations and recommendations
- **Exports**:
  - `calculateCalories()` - Main calorie calculation function
  - `getBreedFactor()` - Get breed-specific metabolic factor
  - `getRecommendedProducts()` - Get product recommendations
  - `CalculatorManager` - Class for managing calculator state

#### `js/cart.js`
- **Purpose**: Shopping cart functionality
- **Exports**:
  - `addToCart()` - Add products to cart
  - `removeFromCart()` - Remove products from cart
  - `updateQuantity()` - Update product quantities
  - `processPayment()` - Handle checkout process
  - Cart page initialization functions

#### `js/language.js`
- **Purpose**: Internationalization and language switching
- **Exports**:
  - `switchLanguage()` - Change application language
  - `updateTranslations()` - Update UI text
  - `getCurrentLanguage()` - Get current language setting

#### `js/products.js`
- **Purpose**: Product management and display
- **Exports**:
  - `loadProducts()` - Load and display products
  - `initializeProductsPage()` - Initialize products page
  - Product filtering functionality

#### `js/trial.js`
- **Purpose**: Trial calculator functionality
- **Exports**:
  - `initializeTrialPage()` - Initialize trial page
  - `showStep()` - Navigate between calculator steps
  - Validation and data saving functions

#### `js/chat.js`
- **Purpose**: AI-powered customer support chat
- **Exports**:
  - `initializeChatPage()` - Initialize chat page
  - `getAIResponse()` - Get AI-generated responses
  - Chat message handling

#### `js/utils.js`
- **Purpose**: Utility functions and common helpers
- **Exports**:
  - `showNotification()` - Display user notifications
  - `formatCurrency()` - Format currency values
  - Page initialization helpers

### Application Modules

#### `js/app.js`
- **Purpose**: Main application initialization
- **Exports**: Main app initialization function
- **Imports**: All other modules

#### `js/compatibility.js`
- **Purpose**: Backward compatibility layer
- **Exports**: All functions to global scope for HTML compatibility

#### `js/main.js`
- **Purpose**: Main entry point
- **Imports**: App and compatibility modules

## Usage

### In HTML Files

All HTML files now use:
```html
<script type="module" src="js/main.js"></script>
```

### Module Imports

To use functions from other modules:
```javascript
import { addToCart, removeFromCart } from './cart.js';
import { getCurrentLanguage } from './language.js';
```

### Global Functions

For backward compatibility, all necessary functions are exported to the global scope:
- `addToCart()`
- `removeFromCart()`
- `updateQuantity()`
- `processPayment()`
- `showStep()`
- `validateStep1()`
- `validateStep2()`
- `saveStep1Data()`
- `saveStep2Data()`
- `calculateAndShowResults()`
- `askQuestion()`
- `showNotification()`

## Benefits

1. **Maintainability**: Code is organized by functionality
2. **Debugging**: Easier to locate and fix issues
3. **Reusability**: Modules can be imported where needed
4. **Scalability**: Easy to add new features
5. **Testing**: Individual modules can be tested separately
6. **Performance**: Better tree-shaking and code splitting

## File Organization

```
js/
├── data.js          # Data constants
├── calculator.js    # Nutrition calculations
├── cart.js          # Shopping cart
├── language.js      # Internationalization
├── products.js      # Product management
├── trial.js         # Trial calculator
├── chat.js          # AI chat support
├── utils.js         # Utility functions
├── app.js           # Main application
├── compatibility.js # Backward compatibility
└── main.js          # Entry point
```

## Migration Notes

- All existing HTML functionality remains the same
- No changes needed to HTML files except script tag
- All global functions are still available
- Cart data and language preferences are preserved
- All calculations and translations work identically

## Testing

Use `test-modules.html` to verify that all modules are loading correctly and global functions are available.

## Browser Support

Requires modern browsers that support ES6 modules. For older browsers, consider using a bundler like Webpack or Rollup.
