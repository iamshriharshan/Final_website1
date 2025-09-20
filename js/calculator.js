// Pappa Fresh - Calculator Logic

import { products, dogBreeds, dailyGramsTable, staticRecommendations } from './data.js';

// Utility functions for calculations
export function interpolateDailyGrams(weight) {
    const weights = Object.keys(dailyGramsTable).map(Number).sort((a, b) => a - b);
    
    if (weight <= weights[0]) return dailyGramsTable[weights[0]];
    if (weight >= weights[weights.length - 1]) return dailyGramsTable[weights[weights.length - 1]];
    
    // Find the two closest weights for interpolation
    let lowerWeight = weights[0];
    let upperWeight = weights[weights.length - 1];
    
    for (let i = 0; i < weights.length - 1; i++) {
        if (weight >= weights[i] && weight <= weights[i + 1]) {
            lowerWeight = weights[i];
            upperWeight = weights[i + 1];
            break;
        }
    }
    
    // Linear interpolation
    const lowerGrams = dailyGramsTable[lowerWeight];
    const upperGrams = dailyGramsTable[upperWeight];
    const ratio = (weight - lowerWeight) / (upperWeight - lowerWeight);
    
    return Math.round(lowerGrams + (upperGrams - lowerGrams) * ratio);
}

export function calculateCalories(weight, age, activity, neutered, breedCategory, recipeId) {
    // Get daily grams from reference table
    const dailyGrams = interpolateDailyGrams(weight);
    
    // Get recipe calorie density
    const recipe = products.find(p => p.id === recipeId);
    const caloriesPer100g = recipe ? recipe.caloriesPer100g : 130; // Default to beef
    
    // Calculate base calories
    const baseCalories = (dailyGrams * caloriesPer100g) / 100;
    
    // Apply activity multiplier
    let activityMultiplier = 1.0;
    switch (activity) {
        case 'high': activityMultiplier = 1.2; break;
        case 'low': activityMultiplier = 0.8; break;
        default: activityMultiplier = 1.0; break;
    }
    
    // Apply neutering adjustment
    const neuteringFactor = neutered === 'yes' ? 0.9 : 1.0;
    
    // Apply breed factor
    const breedFactor = getBreedFactor(breedCategory);
    
    // Calculate final calories
    const finalCalories = Math.round(baseCalories * breedFactor * activityMultiplier * neuteringFactor);
    
    return {
        dailyGrams,
        baseCalories: Math.round(baseCalories),
        finalCalories,
        portions: Math.ceil(finalCalories / (caloriesPer100g * 4)), // 400g portions
        monthlyPortions: Math.ceil((finalCalories / (caloriesPer100g * 4)) * 30)
    };
}

export function getBreedFactor(breedName) {
    for (const [category, data] of Object.entries(dogBreeds)) {
        if (data.breeds.includes(breedName)) {
            return data.factor;
        }
    }
    return 1.0; // Default factor
}

export function getBreedCategory(breedName) {
    for (const [category, data] of Object.entries(dogBreeds)) {
        if (data.breeds.includes(breedName)) {
            return category;
        }
    }
    return 'mixed';
}

export function getRecommendedProducts(age, activity, breedCategory, condition) {
    let recommendedIds = new Set();
    
    // Age-based recommendations
    if (staticRecommendations[age]) {
        staticRecommendations[age].primary.forEach(id => recommendedIds.add(id));
        staticRecommendations[age].secondary.forEach(id => recommendedIds.add(id));
    }
    
    // Activity-based recommendations
    const activityKey = activity + '_activity';
    if (staticRecommendations[activityKey]) {
        staticRecommendations[activityKey].primary.forEach(id => recommendedIds.add(id));
    }
    
    // Breed size recommendations
    if (staticRecommendations[breedCategory]) {
        staticRecommendations[breedCategory].primary.forEach(id => recommendedIds.add(id));
    }
    
    // Condition-based recommendations
    if (staticRecommendations[condition]) {
        staticRecommendations[condition].primary.forEach(id => recommendedIds.add(id));
        staticRecommendations[condition].secondary.forEach(id => recommendedIds.add(id));
    }
    
    return Array.from(recommendedIds);
}

// Calculator state management
export class CalculatorManager {
    constructor() {
        this.data = {};
        this.currentStep = 1;
    }

    setStep(step) {
        this.currentStep = step;
    }

    getStep() {
        return this.currentStep;
    }

    saveStep1Data(name, breed, weight, age) {
        this.data.name = name;
        this.data.breed = breed;
        this.data.weight = parseFloat(weight);
        this.data.age = age;
    }

    saveStep2Data(activity, neutered, condition) {
        this.data.activity = activity;
        this.data.neutered = neutered;
        this.data.condition = condition;
    }

    calculateResults() {
        const breedCategory = getBreedCategory(this.data.breed);
        
        // Calculate for default recipe (Chicken - most common)
        const defaultRecipeId = 2; // Chicken
        const results = calculateCalories(
            this.data.weight,
            this.data.age,
            this.data.activity,
            this.data.neutered,
            breedCategory,
            defaultRecipeId
        );
        
        // Store results for product recommendations
        this.data.results = results;
        this.data.breedCategory = breedCategory;
        
        return results;
    }

    getRecommendedProducts() {
        return getRecommendedProducts(
            this.data.age,
            this.data.activity,
            this.data.breedCategory,
            this.data.condition
        );
    }

    getData() {
        return this.data;
    }
}
