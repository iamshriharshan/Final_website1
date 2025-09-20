// Pappa Fresh - Main JavaScript File

// Cookie utilities
function setCookie(name, value, days = null, path = '/') {
    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        cookieString += `; expires=${date.toUTCString()}`;
    }
    
    cookieString += `; path=${path}`;
    
    document.cookie = cookieString;
}

function getCookie(name) {
    const nameEQ = encodeURIComponent(name) + "=";
    const cookies = document.cookie.split(';');
    
    for (let cookie of cookies) {
        let c = cookie.trim();
        if (c.indexOf(nameEQ) === 0) {
            return decodeURIComponent(c.substring(nameEQ.length));
        }
    }
    return null;
}

// Global variables
let currentStep = 1;
let calculatorData = {};
let currentLanguage = 'it';
let cart = JSON.parse(getCookie('pappa-cart') || '[]');

// Product catalog with new products
const products = [
    {
        id: 1,
        name: 'PappaFresh Manzo',
        nameEn: 'PappaFresh Beef',
        price: 6.66,
        image: 'https://lovable-uploads.s3.amazonaws.com/b650dfca-230d-4766-8e94-d7979d40d23e.png',
        description: 'Manzo fresco italiano con verdure di stagione',
        descriptionEn: 'Fresh Italian beef with seasonal vegetables',
        category: 'adult',
        weight: '400g',
        caloriesPer100g: 130,
        ingredients: ['Manzo fresco 60%', 'Carote', 'Zucchine', 'Riso integrale'],
        ingredientsEn: ['Fresh beef 60%', 'Carrots', 'Zucchini', 'Brown rice']
    },
    {
        id: 2,
        name: 'PappaFresh Pollo',
        nameEn: 'PappaFresh Chicken',
        price: 6.66,
        image: 'https://lovable-uploads.s3.amazonaws.com/pollo-product-image.png',
        description: 'Pollo ruspante con patate dolci e spinaci',
        descriptionEn: 'Free-range chicken with sweet potatoes and spinach',
        category: 'adult',
        weight: '400g',
        caloriesPer100g: 120,
        ingredients: ['Pollo ruspante 65%', 'Patate dolci', 'Spinaci', 'Quinoa'],
        ingredientsEn: ['Free-range chicken 65%', 'Sweet potatoes', 'Spinach', 'Quinoa']
    },
    {
        id: 3,
        name: 'PappaFresh Tacchino',
        nameEn: 'PappaFresh Turkey',
        price: 6.66,
        image: 'https://lovable-uploads.s3.amazonaws.com/tacchino-product-image.png',
        description: 'Tacchino magro con zucca e broccoli',
        descriptionEn: 'Lean turkey with pumpkin and broccoli',
        category: 'adult',
        weight: '400g',
        caloriesPer100g: 110,
        ingredients: ['Tacchino 60%', 'Zucca', 'Broccoli', 'Orzo perlato'],
        ingredientsEn: ['Turkey 60%', 'Pumpkin', 'Broccoli', 'Pearl barley']
    },
    {
        id: 4,
        name: 'PappaFresh Equino',
        nameEn: 'PappaFresh Horse',
        price: 6.66,
        image: 'https://lovable-uploads.s3.amazonaws.com/equino-product-image.png',
        description: 'Carne equina ipoallergenica con verdure miste',
        descriptionEn: 'Hypoallergenic horse meat with mixed vegetables',
        category: 'special',
        weight: '400g',
        caloriesPer100g: 140,
        ingredients: ['Carne equina 60%', 'Carote', 'Piselli', 'Riso basmati'],
        ingredientsEn: ['Horse meat 60%', 'Carrots', 'Peas', 'Basmati rice']
    },
    {
        id: 5,
        name: 'PappaFresh Maiale',
        nameEn: 'PappaFresh Pork',
        price: 6.66,
        image: 'https://lovable-uploads.s3.amazonaws.com/maiale-product-image.png',
        description: 'Maiale biologico con mele e finocchi',
        descriptionEn: 'Organic pork with apples and fennel',
        category: 'adult',
        weight: '400g',
        caloriesPer100g: 150,
        ingredients: ['Maiale biologico 60%', 'Mele', 'Finocchi', 'Farro'],
        ingredientsEn: ['Organic pork 60%', 'Apples', 'Fennel', 'Spelt']
    }
];

// Dog breeds with metabolic factors
const dogBreeds = {
    'toy': {
        factor: 1.1,
        breeds: ['Chihuahua', 'Maltese', 'Barboncino Toy']
    },
    'small': {
        factor: 1.0,
        breeds: ['Shih Tzu', 'Bassotto', 'Carlino', 'Cavalier King Charles Spaniel']
    },
    'medium': {
        factor: 1.0,
        breeds: ['Bulldog Francese', 'Beagle', 'Cocker Spaniel', 'Border Collie']
    },
    'large': {
        factor: 0.9,
        breeds: ['Labrador Retriever', 'Golden Retriever', 'Pastore Tedesco', 'Rottweiler', 'Dobermann']
    },
    'giant': {
        factor: 0.8,
        breeds: ['Alano', 'San Bernardo', 'Terranova']
    },
    'mixed': {
        factor: 1.0,
        breeds: ['Meticcio / Sconosciuto']
    }
};

// Daily grams reference table (2kg to 50kg)
const dailyGramsTable = {
    2: 101, 3: 135, 4: 166, 5: 194, 6: 221, 7: 246, 8: 270, 9: 293, 10: 315,
    11: 336, 12: 357, 13: 377, 14: 396, 15: 415, 16: 433, 17: 451, 18: 469,
    19: 486, 20: 503, 21: 519, 22: 535, 23: 551, 24: 567, 25: 582, 26: 597,
    27: 612, 28: 627, 29: 641, 30: 655, 31: 669, 32: 683, 33: 696, 34: 710,
    35: 723, 36: 736, 37: 749, 38: 762, 39: 774, 40: 787, 41: 799, 42: 811,
    43: 823, 44: 835, 45: 847, 46: 858, 47: 870, 48: 881, 49: 893, 50: 1123
};

// Static recommendations based on Excel data
const staticRecommendations = {
    // Age-based recommendations
    'puppy': {
        primary: [2], // Chicken - easier to digest for puppies
        secondary: [3] // Turkey - lean protein
    },
    'young': {
        primary: [1, 2], // Beef, Chicken - high energy needs
        secondary: [5] // Pork - variety
    },
    'adult': {
        primary: [1, 2, 3], // Beef, Chicken, Turkey - balanced nutrition
        secondary: [5] // Pork - variety
    },
    'senior': {
        primary: [2, 3], // Chicken, Turkey - easier digestion
        secondary: [4] // Horse - hypoallergenic option
    },
    
    // Activity level recommendations
    'high_activity': {
        primary: [1, 5], // Beef, Pork - higher calorie density
        secondary: [2] // Chicken
    },
    'moderate_activity': {
        primary: [1, 2, 3], // Beef, Chicken, Turkey
        secondary: [5] // Pork
    },
    'low_activity': {
        primary: [2, 3], // Chicken, Turkey - lower calories
        secondary: [4] // Horse
    },
    
    // Breed size recommendations
    'toy': {
        primary: [2, 3], // Chicken, Turkey - smaller kibble, easier digestion
        secondary: [1] // Beef
    },
    'small': {
        primary: [2, 3], // Chicken, Turkey
        secondary: [1, 5] // Beef, Pork
    },
    'medium': {
        primary: [1, 2, 3], // Beef, Chicken, Turkey
        secondary: [5] // Pork
    },
    'large': {
        primary: [1, 2], // Beef, Chicken - higher protein needs
        secondary: [3, 5] // Turkey, Pork
    },
    'giant': {
        primary: [1, 2], // Beef, Chicken - high protein for large breeds
        secondary: [3] // Turkey
    },
    
    // Special conditions
    'overweight': {
        primary: [2, 3], // Chicken, Turkey - lower calorie
        secondary: [4] // Horse
    },
    'underweight': {
        primary: [1, 5], // Beef, Pork - higher calorie
        secondary: [2] // Chicken
    },
    'allergies': {
        primary: [4], // Horse - hypoallergenic
        secondary: [3] // Turkey
    }
};

// Translations
const translations = {
    it: {
        // Existing translations
        'nav.products': 'Prodotti',
        'nav.trial': 'Box Prova',
        'nav.faq': 'FAQ',
        'nav.chat': 'Assistenza',
        'nav.contact': 'Contatti',
        'nav.blog': 'Blog',
        
        // Trial page translations
        'trial.title': 'Calcola il Piano Perfetto per il tuo Cane',
        'trial.subtitle': 'Scopri le porzioni ideali e il piano nutrizionale personalizzato',
        'trial.step1': 'Informazioni Base',
        'trial.step2': 'Salute e Attività',
        'trial.step3': 'Il Tuo Piano',
        'trial.name': 'Nome del cane',
        'trial.breed': 'Razza',
        'trial.weight': 'Peso attuale (kg)',
        'trial.age': 'Età',
        'trial.age.puppy': 'Cucciolo (2-12 mesi)',
        'trial.age.young': 'Giovane (1-2 anni)',
        'trial.age.adult': 'Adulto (3-7 anni)',
        'trial.age.senior': 'Senior (8+ anni)',
        'trial.activity': 'Livello di attività',
        'trial.activity.low': 'Basso (passeggiate tranquille)',
        'trial.activity.moderate': 'Moderato (1-2 ore al giorno)',
        'trial.activity.high': 'Alto (molto attivo, sport)',
        'trial.neutered': 'Sterilizzato/Castrato?',
        'trial.yes': 'Sì',
        'trial.no': 'No',
        'trial.condition': 'Condizione corporea',
        'trial.condition.underweight': 'Sottopeso',
        'trial.condition.ideal': 'Peso ideale',
        'trial.condition.overweight': 'Sovrappeso',
        'trial.condition.obese': 'Obeso',
        'trial.next': 'Avanti',
        'trial.back': 'Indietro',
        'trial.calculate': 'Calcola Piano',
        'trial.results.title': 'Il Piano Perfetto per',
        'trial.results.calories': 'Calorie giornaliere',
        'trial.results.portions': 'Bustine Pappa Fresh al giorno',
        'trial.results.monthly': 'Bustine al mese',
        'trial.results.cost': 'Costo mensile stimato',

        // Products page translations
        'products.title': 'I Nostri Prodotti',
        'products.subtitle': 'Ricette bilanciate per ogni esigenza',
        'products.filter.all': 'Tutti',
        'products.filter.puppy': 'Cuccioli',
        'products.filter.adult': 'Adulti',
        'products.filter.senior': 'Senior',
        'products.filter.special': 'Speciali',
        'products.vet.title': 'Sviluppato nelle nostre Cliniche Veterinarie',
        
        // Footer and common elements
        'footer.about.text': 'Pappa Fresh è il primo servizio italiano di cibo fresco per cani, preparato con ingredienti di qualità umana e consegnato a domicilio.',
        'footer.links': 'Link Utili',
        'footer.newsletter': 'Newsletter',
        'footer.newsletter.text': 'Iscriviti per ricevere consigli e offerte esclusive',
        'footer.newsletter.placeholder': 'La tua email',
        'footer.newsletter.button': 'Iscriviti',
        'footer.rights': 'Tutti i diritti riservati',
        
        // Home page translations
        'home.hero.title': 'Noi di Pappa Fresh produciamo cibo di altissima qualità per migliorare la vita del tuo cane tramite l\'alimentazione',
        'home.hero.subtitle': 'Cibo vero • Fresco • Direttamente a casa',
        'home.hero.cta': 'Calcola il Piano Perfetto',
        'home.why.title': 'Come noi, anche i nostri cani necessitano di alimentarsi in maniera sana',
        'home.why.subtitle': 'Hai presente quella sensazione che provi quando mangi bene? I cani provano lo stesso!',
        'home.features.vet': 'Sviluppato dai nostri veterinari',
        'home.features.vet.desc': 'Formulato con esperti nutrizionisti veterinari nelle nostre cliniche',
        'home.features.delivery': 'Arriviamo Ovunque',
        'home.features.delivery.desc': 'Consegnato fresco in tutta Italia in 24-48 ore',
        'home.features.quality': 'Qualità Garantita',
        'home.features.quality.desc': 'Solo ingredienti di qualità umana, senza conservanti',
        'home.features.freshness': 'Freschezza Assicurata',
        'home.features.freshness.desc': 'Consegna refrigerata per mantenere la freschezza',
        'home.cta.title': 'Pronto a Iniziare?',
        'home.cta.subtitle': 'Calcola il piano perfetto per il tuo cane in meno di 2 minuti',
        'home.cta.button': 'Calcola Ora',
        
        // Page headers
        'contact.title': 'Contattaci',
        'contact.subtitle': 'Siamo sempre disponibili per te e il tuo amico a quattro zampe',
        'faq.title': 'Domande Frequenti',
        'faq.subtitle': 'Trova tutte le risposte alle tue domande',
        'blog.title': 'Il Blog di Pappa Fresh',
        'blog.subtitle': 'Consigli e curiosità sul mondo dei cani',
        
        // Common elements
        'cta.calculate': 'Calcola Ora',
        'cta.readmore': 'Leggi di più',
        'button.subscribe': 'Iscriviti',
        'button.send': 'Invia Messaggio',
        'button.addToCart': 'Aggiungi al Carrello',
        'ingredients': 'Ingredienti',
        
        // Trial info section
        'trial.info.calc.title': 'Calcolo Scientifico',
        'trial.info.calc.desc': 'Formula veterinaria basata su peso, età e attività per determinare il fabbisogno calorico esatto',
        'trial.info.portions.title': 'Porzioni Precise',
        'trial.info.portions.desc': 'Ti diciamo esattamente quante bustine servono al giorno per mantenere il peso ideale',
        'trial.info.delivery.title': 'Consegna Regolare',
        'trial.info.delivery.desc': "Ricevi automaticamente la quantità giusta ogni mese, con sconto del 10% sull'abbonamento"
    },
    en: {
        // Existing translations
        'nav.products': 'Products',
        'nav.trial': 'Trial Box',
        'nav.faq': 'FAQ',
        'nav.chat': 'Support',
        'nav.contact': 'Contact',
        'nav.blog': 'Blog',
        
        // Trial page translations
        'trial.title': 'Calculate the Perfect Plan for your Dog',
        'trial.subtitle': 'Discover ideal portions and personalized nutrition plan',
        'trial.step1': 'Basic Information',
        'trial.step2': 'Health & Activity',
        'trial.step3': 'Your Plan',
        'trial.name': "Dog's name",
        'trial.breed': 'Breed',
        'trial.weight': 'Current weight (kg)',
        'trial.age': 'Age',
        'trial.age.puppy': 'Puppy (2-12 months)',
        'trial.age.young': 'Young (1-2 years)',
        'trial.age.adult': 'Adult (3-7 years)',
        'trial.age.senior': 'Senior (8+ years)',
        'trial.activity': 'Activity level',
        'trial.activity.low': 'Low (quiet walks)',
        'trial.activity.moderate': 'Moderate (1-2 hours per day)',
        'trial.activity.high': 'High (very active, sports)',
        'trial.neutered': 'Neutered/Spayed?',
        'trial.yes': 'Yes',
        'trial.no': 'No',
        'trial.condition': 'Body condition',
        'trial.condition.underweight': 'Underweight',
        'trial.condition.ideal': 'Ideal weight',
        'trial.condition.overweight': 'Overweight',
        'trial.condition.obese': 'Obese',
        'trial.next': 'Next',
        'trial.back': 'Back',
        'trial.calculate': 'Calculate Plan',
        'trial.results.title': 'The Perfect Plan for',
        'trial.results.calories': 'Daily calories',
        'trial.results.portions': 'Pappa Fresh pouches per day',
        'trial.results.monthly': 'Pouches per month',
        'trial.results.cost': 'Estimated monthly cost',

        // Products page translations
        'products.title': 'Our Products',
        'products.subtitle': 'Balanced recipes for every need',
        'products.filter.all': 'All',
        'products.filter.puppy': 'Puppies',
        'products.filter.adult': 'Adults',
        'products.filter.senior': 'Senior',
        'products.filter.special': 'Special',
        'products.vet.title': 'Developed in our Veterinary Clinics',
        
        // Footer and common elements
        'footer.about.text': 'Pappa Fresh is the first Italian fresh dog food service, prepared with human-grade ingredients and delivered to your door.',
        'footer.links': 'Useful Links',
        'footer.newsletter': 'Newsletter',
        'footer.newsletter.text': 'Subscribe to receive tips and exclusive offers',
        'footer.newsletter.placeholder': 'Your email',
        'footer.newsletter.button': 'Subscribe',
        'footer.rights': 'All rights reserved',
        
        // Home page translations
        'home.hero.title': 'At Pappa Fresh, we produce high-quality food to improve your dog\'s life through nutrition',
        'home.hero.subtitle': 'Real Food • Fresh • Direct to Your Home',
        'home.hero.cta': 'Calculate Perfect Plan',
        'home.why.title': 'Like us, our dogs need to eat healthy too',
        'home.why.subtitle': 'You know that feeling when you eat well? Dogs feel the same!',
        'home.features.vet': 'Developed by our veterinarians',
        'home.features.vet.desc': 'Formulated with expert veterinary nutritionists in our clinics',
        'home.features.delivery': 'We Deliver Everywhere',
        'home.features.delivery.desc': 'Delivered fresh throughout Italy in 24-48 hours',
        'home.features.quality': 'Guaranteed Quality',
        'home.features.quality.desc': 'Only human-grade ingredients, no preservatives',
        'home.features.freshness': 'Freshness Guaranteed',
        'home.features.freshness.desc': 'Refrigerated delivery to maintain freshness',
        'home.cta.title': 'Ready to Start?',
        'home.cta.subtitle': 'Calculate the perfect plan for your dog in less than 2 minutes',
        'home.cta.button': 'Calculate Now',
        
        // Page headers
        'contact.title': 'Contact Us',
        'contact.subtitle': 'We are always available for you and your four-legged friend',
        'faq.title': 'Frequently Asked Questions',
        'faq.subtitle': 'Find all the answers to your questions',
        'blog.title': 'The Pappa Fresh Blog',
        'blog.subtitle': 'Tips and insights about the dog world',
        
        // Common elements
        'cta.calculate': 'Calculate Now',
        'cta.readmore': 'Read More',
        'button.subscribe': 'Subscribe',
        'button.send': 'Send Message',
        'button.addToCart': 'Add to Cart',
        'ingredients': 'Ingredients',
        
        // Trial info section
        'trial.info.calc.title': 'Scientific Calculation',
        'trial.info.calc.desc': 'Veterinary formula based on weight, age, and activity to determine exact calorie needs',
        'trial.info.portions.title': 'Precise Portions',
        'trial.info.portions.desc': 'We tell you exactly how many pouches per day to maintain ideal weight',
        'trial.info.delivery.title': 'Regular Delivery',
        'trial.info.delivery.desc': 'Automatically receive the right amount every month, with 10% off subscription'
    }
};

// Utility functions
function interpolateDailyGrams(weight) {
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

function calculateCalories(weight, age, activity, neutered, breedCategory, recipeId) {
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

function getBreedFactor(breedName) {
    for (const [category, data] of Object.entries(dogBreeds)) {
        if (data.breeds.includes(breedName)) {
            return data.factor;
        }
    }
    return 1.0; // Default factor
}

function getBreedCategory(breedName) {
    for (const [category, data] of Object.entries(dogBreeds)) {
        if (data.breeds.includes(breedName)) {
            return category;
        }
    }
    return 'mixed';
}

function getRecommendedProducts(age, activity, breedCategory, condition) {
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
            initializeContactPage();
            break;
        case 'blog':
            initializeBlogPage();
            break;
    }
    
    // Initialize newsletter forms
    initializeNewsletterForms();
}

function showNutritionPlan() {
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

// Products page initialization
function initializeProductsPage() {
    // Load initial products
    loadProducts();
    
    // Initialize filters
    initializeProductFilters();
    
    // Show nutrition plan if coming from calculator
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('from') === 'calculator') {
        showNutritionPlan();
    }
    
    // Initialize language
    updateTranslations();
}

function loadProducts(filter = 'all', recommendedIds = []) {
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
        const productName = currentLanguage === 'en' ? product.nameEn : product.name;
        const productDescription = currentLanguage === 'en' ? product.descriptionEn : product.description;
        const buttonText = translations[currentLanguage]['button.addToCart'] || 'Aggiungi al Carrello';
        
        container.innerHTML += `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card product-card h-100" data-product-id="${product.id}">
                    ${isRecommended ? '<div class="product-badge">Raccomandato</div>' : ''}
                    <img src="${product.image}" class="card-img-top" alt="${productName}">
                    <div class="card-body">
                        <h5 class="card-title">${productName}</h5>
                        <p class="card-text">${productDescription}</p>
                        <p class="text-muted small">
                            <strong>${translations[currentLanguage]['ingredients'] || 'Ingredienti'}:</strong> 
                            ${(currentLanguage === 'en' ? product.ingredientsEn : product.ingredients).join(', ')}
                        </p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="price-tag">€${product.price.toFixed(2)}</div>
                            <small class="text-muted">${product.weight}</small>
                        </div>
                        <button class="btn btn-primary w-100 mt-2" onclick="addToCart(${product.id})">
                            <i class="bi bi-cart-plus me-2"></i>${buttonText}
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}

function initializeProductFilters() {
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


// Trial page initialization
function initializeTrialPage() {
    populateBreedDropdown();
    initializeCalculatorSteps();
}

function populateBreedDropdown() {
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

function initializeCalculatorSteps() {
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

function validateStep1() {
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

function validateStep2() {
    const activity = document.getElementById('dog-activity').value;
    const neutered = document.querySelector('input[name="dog-neutered"]:checked');
    const condition = document.getElementById('dog-condition').value;
    
    if (!activity || !neutered || !condition) {
        alert('Per favore compila tutti i campi obbligatori');
        return false;
    }
    
    return true;
}

function saveStep1Data() {
    calculatorData.name = document.getElementById('dog-name').value.trim();
    calculatorData.breed = document.getElementById('dog-breed').value;
    calculatorData.weight = parseFloat(document.getElementById('dog-weight').value);
    calculatorData.age = document.getElementById('dog-age').value;
}

function saveStep2Data() {
    calculatorData.activity = document.getElementById('dog-activity').value;
    calculatorData.neutered = document.querySelector('input[name="dog-neutered"]:checked').value;
    calculatorData.condition = document.getElementById('dog-condition').value;
}

function calculateAndShowResults() {
    const breedCategory = getBreedCategory(calculatorData.breed);
    
    // Calculate for default recipe (Chicken - most common)
    const defaultRecipeId = 2; // Chicken
    const results = calculateCalories(
        calculatorData.weight,
        calculatorData.age,
        calculatorData.activity,
        calculatorData.neutered,
        breedCategory,
        defaultRecipeId
    );
    
    // Update results display
    document.getElementById('result-dog-name').textContent = calculatorData.name;
    document.getElementById('result-calories').textContent = results.finalCalories;
    document.getElementById('result-portions').textContent = results.portions;
    document.getElementById('result-monthly').textContent = results.monthlyPortions;
    document.getElementById('result-cost').textContent = (results.monthlyPortions * 6.66).toFixed(2);
    
    // Store results for product recommendations
    calculatorData.results = results;
    calculatorData.breedCategory = breedCategory;
    
    // Show recommended products
    showRecommendedProducts();
}

function showRecommendedProducts() {
    const recommendedIds = getRecommendedProducts(
        calculatorData.age,
        calculatorData.activity,
        calculatorData.breedCategory,
        calculatorData.condition
    );
    
    const container = document.getElementById('recommended-product-container');
    if (!container) return;
    
    container.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h4 class="card-title mb-4">
                    <i class="bi bi-star-fill text-warning me-2"></i>
                    <span data-i18n="trial.recommended.title">Prodotti Raccomandati per</span> ${calculatorData.name}
                </h4>
                <div class="row" id="recommended-products">
                    ${products.filter(p => recommendedIds.includes(p.id)).map(product => `
                        <div class="col-md-6 col-lg-4 mb-3">
                            <div class="card h-100">
                                <img src="${product.image}" class="card-img-top" alt="${product.name}" style="height: 200px; object-fit: cover;">
                                <div class="card-body">
                                    <div class="product-badge" data-i18n="trial.recommended.badge">Raccomandato</div>
                                    <h6 class="card-title">${product.name}</h6>
                                    <p class="card-text small">${product.description}</p>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <span class="price-tag">€${product.price.toFixed(2)}</span>
                                        <small class="text-muted">${product.weight}</small>
                                    </div>
                                    <button class="btn btn-primary btn-sm w-100 mt-2" onclick="addToCart(${product.id})">
                                        <i class="bi bi-cart-plus me-1"></i>Aggiungi
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
    updateTranslations();
}

function showStep(stepNumber) {
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
    
    currentStep = stepNumber;
}

// Cart functionality
function addToCart(productId, recommendedQuantity = null) {
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

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    setCookie('pappa-cart', JSON.stringify(cart), 30); // Store for 30 days
    updateCartBadge();
    
    if (document.body.getAttribute('data-page') === 'cart') {
        loadCartItems();
    }
}

function updateQuantity(productId, newQuantity) {
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

function updateCartBadge() {
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

// Cart page initialization
function initializeCartPage() {
    loadCartItems();
}

function loadCartItems() {
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

function updateOrderSummary() {
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

// Checkout page initialization
function initializeCheckoutPage() {
    loadCheckoutData();
}

function loadCheckoutData() {
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

function loadCheckoutItems(purchaseType = 'single') {
    const container = document.getElementById('checkout-items');
    if (!container) return;
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = purchaseType === 'subscription' ? subtotal * 0.1 : 0;
    const shipping = 0; // Free shipping for checkout
    const total = subtotal - discount + shipping;
    
    container.innerHTML = cart.map(item => `
        <div class="d-flex justify-content-between align-items-center mb-2">
            <div class="d-flex align-items-center">
                <img src="${item.image}" alt="${item.name}" width="40" height="40" class="rounded me-2">
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
function processPayment() {
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
        removeCookie('pappa-cart');
        
        // Redirect to success page
        window.location.href = 'order-success.html';
    }, 2000);
}

// Chat functionality
function initializeChatPage() {
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    
    if (chatForm) {
        chatForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const message = chatInput.value.trim();
            if (message) {
                addChatMessage(message, 'user');
                chatInput.value = '';
                
                try {
                    const response = await getAIResponse(message);
                    addChatMessage(response, 'bot');
                } catch (error) {
                    console.error('Chat error:', error);
                    addChatMessage('Mi scuso, ma al momento non riesco a rispondere. Prova a contattare il nostro servizio clienti.', 'bot');
                }
            }
        });
    }
}

// Chat UI helper to append messages to the chat window
function addChatMessage(text, sender) {
    const messagesContainer = document.getElementById('chat-messages');
    if (!messagesContainer) return;

    const messageWrapper = document.createElement('div');
    messageWrapper.className = `message ${sender === 'user' ? 'user' : 'bot'}`;

    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    // Basic formatting: preserve line breaks
    messageContent.innerHTML = (text || '').toString().replace(/\n/g, '<br>');

    messageWrapper.appendChild(messageContent);
    messagesContainer.appendChild(messageWrapper);

    // Auto-scroll to latest message
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

async function getAIResponse(message) {
    const API_KEY = 'AIzaSyADHd4Cq4Nvr6tNqwxiWCXj3f4YMd2pV6E';
    const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
    
    const context = `You are Pappa Fresh's customer support assistant for fresh dog food.
    
    IMPORTANT:
    - Answer ONLY questions related to Pappa Fresh and dog nutrition.
    - Politely refuse unrelated topics.
    - ALWAYS reply in the SAME language as the customer message: English or Italian.
    
    Knowledge areas:
    - Pappa Fresh products (Beef/Manzo, Chicken/Pollo, Turkey/Tacchino, Horse/Equino, Pork/Maiale)
    - Dog nutrition, portions, storage, delivery, subscriptions, human‑grade ingredients
    - Age/size-specific nutrition guidance
    
    Pappa Fresh facts:
    - Fresh food with human‑grade ingredients
    - Refrigerated delivery across Italy in 24–48 hours
    - Free shipping over €39
    - Flexible subscription with 10% discount
    - Vet-developed balanced recipes
    - Store in fridge 3–4 days once opened; freeze up to 3 months
    
    Keep answers concise and professional.`;

    try {
        const response = await fetch(`${API_URL}?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    role: 'user',
                    parts: [{ text: `${context}\n\nDomanda del cliente: ${message}` }]
                }]
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text || 'Mi scuso, non ho capito la domanda. Puoi riprovare?';

    } catch (error) {
        console.error('AI API Error:', error);
        return getBotFallbackResponse(message);
    }
}

function getBotFallbackResponse(message) {
    const lang = detectLanguage(message);

    const keywordsIt = {
        'conserv': "Pappa Fresh va conservata in frigorifero e consumata entro 3-4 giorni dall'apertura. Può essere congelata fino a 3 mesi.",
        'consegn': 'Consegniamo in 24-48 ore in tutta Italia con corriere refrigerato. Spedizione gratuita sopra i 39€.',
        'abbonam': "L'abbonamento è flessibile e senza vincoli. Ricevi la pappa ogni 2 o 4 settimane con il 10% di sconto.",
        'porzion': 'Usa il nostro calcolatore nella sezione "Box Prova" per calcolare le porzioni esatte per il tuo cane.',
        'ricett': 'Le nostre ricette sono preparate con ingredienti freschi di qualità umana. Puoi alternare le ricette ad ogni consegna.',
        'ingredien': 'Utilizziamo solo ingredienti di qualità umana, senza conservanti o additivi artificiali.',
        'prezzo': 'Il prezzo varia in base al piano personalizzato. Usa il calcolatore per un preventivo preciso.',
        'spedizion': 'La spedizione è gratuita per ordini sopra i 39€. Consegniamo in tutta Italia in 24-48 ore.',
        'cane': 'Pappa Fresh è specializzato in alimentazione per cani con ricette bilanciate sviluppate da veterinari.',
        'nutrizion': 'Le nostre ricette sono formulate per fornire una nutrizione completa e bilanciata per cani di tutte le età.',
        'manzo': 'Pappa Fresh Manzo contiene 60% di manzo fresco italiano con verdure di stagione.',
        'pollo': 'Pappa Fresh Pollo contiene 65% di pollo ruspante con patate dolci e spinaci.',
        'tacchino': 'Pappa Fresh Tacchino contiene 60% di tacchino magro con zucca e broccoli.',
        'equino': 'Pappa Fresh Equino è ipoallergenico con 60% di carne equina e verdure miste.',
        'maiale': 'Pappa Fresh Maiale contiene 60% di maiale biologico con mele e finocchi.'
    };

    const keywordsEn = {
        'stor': 'Store Pappa Fresh in the fridge and use within 3–4 days after opening. You can freeze it for up to 3 months.',
        'deliver': 'We deliver across Italy in 24–48 hours with refrigerated courier. Free shipping over €39.',
        'subscr': 'The subscription is flexible with no lock‑in. Receive food every 2 or 4 weeks with a 10% discount.',
        'portion': 'Use our calculator in the "Trial Box" section to get exact portions for your dog.',
        'recipe': 'Our recipes use fresh, human‑grade ingredients. You can alternate recipes with each delivery.',
        'ingred': 'We use only human‑grade ingredients, with no preservatives or artificial additives.',
        'price': 'Pricing depends on your personalized plan. Use the calculator for an accurate quote.',
        'ship': 'Shipping is free for orders over €39. Delivery in 24–48 hours across Italy.',
        'dog': 'Pappa Fresh specializes in balanced, vet‑developed recipes for dogs.',
        'nutrit': 'Our recipes are formulated for complete, balanced nutrition for dogs of all ages.',
        'beef': 'Pappa Fresh Beef contains 60% fresh Italian beef with seasonal vegetables.',
        'chicken': 'Pappa Fresh Chicken contains 65% free‑range chicken with sweet potatoes and spinach.',
        'turkey': 'Pappa Fresh Turkey contains 60% lean turkey with pumpkin and broccoli.',
        'horse': 'Pappa Fresh Horse is hypoallergenic with 60% horse meat and mixed vegetables.',
        'pork': 'Pappa Fresh Pork contains 60% organic pork with apples and fennel.'
    };

    const lowercaseMessage = message.toLowerCase();
    const dict = lang === 'it' ? keywordsIt : keywordsEn;
    for (const [key, response] of Object.entries(dict)) {
        if (lowercaseMessage.includes(key)) return response;
    }

    const itRelated = ['cane', 'cani', 'pappa', 'fresh', 'aliment', 'cibo', 'nutrizion', 'ricett', 'ingredien'];
    const enRelated = ['dog', 'dogs', 'food', 'nutrition', 'ingredient', 'recipe', 'deliver', 'subscription', 'shipping'];
    const isRelated = (lang === 'it' ? itRelated : enRelated).some(k => lowercaseMessage.includes(k));

    if (lang === 'it') {
        return isRelated
            ? 'Per domande specifiche su Pappa Fresh e nutrizione canina, contatta il nostro supporto: +39 02 1234567 o supporto@pappafresh.it.'
            : 'Posso aiutarti solo con Pappa Fresh e nutrizione canina. Per altre informazioni, contatta il nostro supporto: +39 02 1234567.';
    } else {
        return isRelated
            ? 'For specific questions about Pappa Fresh and dog nutrition, please contact support at +39 02 1234567 or supporto@pappafresh.it.'
            : 'I can only help with Pappa Fresh and dog nutrition. For other info, please contact our support at +39 02 1234567.';
    }
}

function detectLanguage(text) {
    const t = (text || '').toLowerCase();
    // Very lightweight heuristic: Italian triggers
    const italianHints = [' il ', ' lo ', ' la ', ' gli ', ' le ', ' dei ', ' delle ', ' degli ', ' ciao', ' come ', ' cosa ', ' grazie', ' per ', ' posso', ' ordin', ' spedizion', ' abbonam', ' prezzo', ' ingredient', ' nutrizion'];
    const englishHints = [' the ', ' and ', ' or ', ' how ', ' what ', ' thanks', ' please', ' order', ' shipping', ' subscription', ' price', ' ingredient', ' nutrition'];
    const itScore = italianHints.reduce((s, k) => s + (t.includes(k) ? 1 : 0), 0);
    const enScore = englishHints.reduce((s, k) => s + (t.includes(k) ? 1 : 0), 0);
    if (itScore > enScore) return 'it';
    return 'en';
}

// Contact form
function initializeContactPage() {
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
function initializeBlogPage() {
    // Blog functionality can be added here
    console.log('Blog page initialized');
}

// Language switcher
function initializeLanguageSwitcher() {
    const langSwitches = document.querySelectorAll('.lang-switch');
    langSwitches.forEach(switcher => {
        switcher.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });
}

function switchLanguage(lang) {
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
        loadProducts();
    }
    
    // Update dynamic content
    updateDynamicContent();
}

function setInitialLanguage() {
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

function updateDynamicContent() {
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

function updateTranslations() {
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

// Utility functions
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

function formatCurrency(amount) {
    return new Intl.NumberFormat('it-IT', {
        style: 'currency',
        currency: 'EUR'
    }).format(amount);
}

// Export functions for global access
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.processPayment = processPayment;
window.askQuestion = function(question) {
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        chatInput.value = question;
        document.getElementById('chat-form').dispatchEvent(new Event('submit'));
    }
};