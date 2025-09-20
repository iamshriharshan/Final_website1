 // Pappa Fresh - Data Constants

// Product catalog with new products
export const products = [
    {
        id: 1,
        name: 'PappaFresh Manzo',
        nameEn: 'PappaFresh Beef',
        price: 6.66,
        image: 'img/manzo.jpg',
        description: 'Manzo fresco italiano con verdure di stagione',
        descriptionEn: 'Fresh Italian beef with seasonal vegetables',
        category: 'all,adult,senior,special',
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
        image: 'img/pollo.jpg',
        description: 'Pollo ruspante con patate dolci e spinaci',
        descriptionEn: 'Free-range chicken with sweet potatoes and spinach',
        category: 'all,puppy,adult,special',
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
        image: 'img/tacchino.jpg',
        description: 'Tacchino magro con zucca e broccoli',
        descriptionEn: 'Lean turkey with pumpkin and broccoli',
        category: 'all,puppy,adult,senior,special',
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
        image: 'img/equino.jpg',
        description: 'Carne equina ipoallergenica con verdure miste',
        descriptionEn: 'Hypoallergenic horse meat with mixed vegetables',
        category: 'all,senior,special',
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
        image: 'img/maiale.jpg',
        description: 'Maiale biologico con mele e finocchi',
        descriptionEn: 'Organic pork with apples and fennel',
        category: 'all,puppy,adult,special',
        weight: '400g',
        caloriesPer100g: 150,
        ingredients: ['Maiale biologico 60%', 'Mele', 'Finocchi', 'Farro'],
        ingredientsEn: ['Organic pork 60%', 'Apples', 'Fennel', 'Spelt']
    }
];

// Dog breeds with metabolic factors
export const dogBreeds = {
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
export const dailyGramsTable = {
    2: 101, 3: 135, 4: 166, 5: 194, 6: 221, 7: 246, 8: 270, 9: 293, 10: 315,
    11: 336, 12: 357, 13: 377, 14: 396, 15: 415, 16: 433, 17: 451, 18: 469,
    19: 486, 20: 503, 21: 519, 22: 535, 23: 551, 24: 567, 25: 582, 26: 597,
    27: 612, 28: 627, 29: 641, 30: 655, 31: 669, 32: 683, 33: 696, 34: 710,
    35: 723, 36: 736, 37: 749, 38: 762, 39: 774, 40: 787, 41: 799, 42: 811,
    43: 823, 44: 835, 45: 847, 46: 858, 47: 870, 48: 881, 49: 893, 50: 1123
};

// Static recommendations based on Excel data
export const staticRecommendations = {
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
export const translations = {
    it: {
        // Existing translations
        'nav.products': 'Prodotti',
        'nav.trial': 'Box Prova',
        'nav.faq': 'FAQ',
        'nav.chat': 'Assistenza',
        'nav.contact': 'Contatti',
        
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
        'trial.recommended.title': 'Prodotti Raccomandati per',
        'trial.recommended.badge': 'Raccomandato',

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
        // FAQ categories
        'faq.cat.general': 'Informazioni Generali',
        'faq.cat.subscription': 'Abbonamento',
        'faq.cat.nutrition': 'Nutrizione',
        'faq.cat.shipping': 'Spedizione e Consegna',
        // FAQ Q/A
        'faq.q1': 'Come conservo Pappa Fresh?',
        'faq.a1': "Pappa Fresh va conservata in frigorifero e consumata entro 3-4 giorni dall'apertura. Può essere congelata fino a 3 mesi.",
        'faq.q2': 'Quali sono i tempi di consegna?',
        'faq.a2': 'Consegniamo in 24-48 ore in tutta Italia con corriere refrigerato. Spedizione gratuita sopra i 39€.',
        'faq.q3': 'Che ingredienti utilizzate?',
        'faq.a3': 'Utilizziamo solo ingredienti freschi di qualità umana: carni fresche italiane, verdure di stagione, cereali integrali. Zero conservanti, coloranti o additivi artificiali.',
        'faq.q4': "Come funziona l'abbonamento?",
        'faq.a4': "L'abbonamento è flessibile e senza vincoli. Ricevi la pappa ogni 2 o 4 settimane con il 10% di sconto. Puoi modificare, mettere in pausa o cancellare quando vuoi.",
        'faq.q5': 'Posso cambiare ricetta?',
        'faq.a5': 'Certo! Puoi alternare le ricette ad ogni consegna per offrire varietà al tuo cane. Basta comunicarcelo prima della spedizione.',
        'faq.q6': "Posso mettere in pausa l'abbonamento?",
        'faq.a6': "Sì, puoi mettere in pausa l'abbonamento in qualsiasi momento dal tuo account o contattando il servizio clienti. La pausa può durare fino a 3 mesi.",
        'faq.q7': 'Come calcolo le porzioni per il mio cane?',
        'faq.a7': 'Usa il nostro calcolatore nella sezione "Box Prova" inserendo peso, età e livello di attività del tuo cane. Ti forniremo le porzioni esatte personalizzate.',
        'faq.q8': 'Posso mischiare Pappa Fresh con le crocchette?',
        'faq.a8': 'Sì, puoi fare una transizione graduale mischiando Pappa Fresh con le crocchette. Inizia con 25% di Pappa Fresh e aumenta gradualmente in 7-10 giorni.',
        'faq.q9': 'È adatto per cani con allergie?',
        'faq.a9': 'Abbiamo ricette ipoallergeniche come Salmone e Quinoa, perfette per cani con sensibilità alimentari. Consulta sempre il tuo veterinario per allergie specifiche.',
        'faq.q10': 'Come viene spedito il cibo?',
        'faq.a10': 'Il cibo viene spedito in box refrigerati con ghiaccio secco per mantenere la catena del freddo. Arriva fresco e pronto per essere conservato in frigorifero.',
        'faq.q11': 'Consegnate in tutta Italia?',
        'faq.a11': 'Sì, consegniamo in tutta Italia incluse le isole. I tempi possono variare da 24 ore per le città principali a 48-72 ore per le zone più remote.',
        // FAQ CTA
        'faq.cta.notfound': 'Non hai trovato la risposta?',
        'faq.cta.team': 'Il nostro team è sempre disponibile per aiutarti',
        'faq.cta.chat': 'Chatta con noi',
        'faq.cta.contact': 'Contattaci',
        'blog.title': 'Il Blog di Pappa Fresh',
        'blog.subtitle': 'Consigli e curiosità sul mondo dei cani',
        
        // Chat translations
        'chat.title': 'Assistenza Chat',
        'chat.subtitle': 'Siamo qui per aiutarti',
        'chat.welcome': 'Ciao! Come posso aiutarti oggi?',
        'chat.placeholder': 'Scrivi il tuo messaggio...',
        'chat.send': 'Invia',
        'chat.support.name': 'Assistenza Pappa Fresh',
        'chat.support.status': 'Online',
        'chat.faq.title': 'Domande Frequenti',
        'chat.faq.storage': 'Come conservo il cibo?',
        'chat.faq.delivery': 'Tempi di consegna',
        'chat.faq.subscription': 'Info abbonamento',
        'chat.faq.portions': 'Calcolo porzioni',
        'chat.faq.recipe': 'Cambiare ricetta',
        'chat.faq.question.storage': 'Come conservo Pappa Fresh?',
        'chat.faq.question.delivery': 'Quali sono i tempi di consegna?',
        'chat.faq.question.subscription': 'Come funziona l\'abbonamento?',
        'chat.faq.question.portions': 'Come calcolo le porzioni?',
        'chat.faq.question.recipe': 'Posso cambiare ricetta?',
        
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
        'trial.recommended.title': 'Recommended Products for',
        'trial.recommended.badge': 'Recommended',

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
        // FAQ categories
        'faq.cat.general': 'General Information',
        'faq.cat.subscription': 'Subscription',
        'faq.cat.nutrition': 'Nutrition',
        'faq.cat.shipping': 'Shipping & Delivery',
        // FAQ Q/A
        'faq.q1': 'How do I store Pappa Fresh?',
        'faq.a1': 'Keep Pappa Fresh refrigerated and consume within 3–4 days after opening. It can be frozen for up to 3 months.',
        'faq.q2': 'What are the delivery times?',
        'faq.a2': 'We deliver within 24–48 hours across Italy with refrigerated courier. Free shipping over €39.',
        'faq.q3': 'What ingredients do you use?',
        'faq.a3': 'We use only fresh, human-grade ingredients: Italian fresh meats, seasonal vegetables, whole grains. No preservatives, colorants, or artificial additives.',
        'faq.q4': 'How does the subscription work?',
        'faq.a4': 'Our subscription is flexible with no commitment. Receive your meals every 2 or 4 weeks with 10% off. You can modify, pause, or cancel anytime.',
        'faq.q5': 'Can I change the recipe?',
        'faq.a5': 'Absolutely! You can alternate recipes with each delivery to offer variety for your dog. Just let us know before shipping.',
        'faq.q6': 'Can I pause the subscription?',
        'faq.a6': 'Yes, you can pause anytime from your account or by contacting customer service. The pause can last up to 3 months.',
        'faq.q7': 'How do I calculate portions for my dog?',
        'faq.a7': 'Use our calculator in the "Trial Box" section by entering your dog’s weight, age, and activity level. We’ll provide exact personalized portions.',
        'faq.q8': 'Can I mix Pappa Fresh with kibble?',
        'faq.a8': 'Yes, you can transition gradually by mixing Pappa Fresh with kibble. Start with 25% Pappa Fresh and increase gradually over 7–10 days.',
        'faq.q9': 'Is it suitable for dogs with allergies?',
        'faq.a9': 'We offer hypoallergenic recipes like Salmon and Quinoa, ideal for sensitive dogs. Always consult your vet for specific allergies.',
        'faq.q10': 'How is the food shipped?',
        'faq.a10': 'We ship in refrigerated boxes with dry ice to maintain the cold chain. It arrives fresh, ready to store in the fridge.',
        'faq.q11': 'Do you deliver throughout Italy?',
        'faq.a11': 'Yes, we deliver throughout Italy including islands. Delivery takes 24 hours for main cities and 48–72 hours for remote areas.',
        // FAQ CTA
        'faq.cta.notfound': "Didn't find the answer?",
        'faq.cta.team': 'Our team is always ready to help you',
        'faq.cta.chat': 'Chat with us',
        'faq.cta.contact': 'Contact us',
        'blog.title': 'The Pappa Fresh Blog',
        'blog.subtitle': 'Tips and insights about the dog world',
        
        // Chat translations
        'chat.title': 'Chat Support',
        'chat.subtitle': 'We are here to help you',
        'chat.welcome': 'Hi! How can I help you today?',
        'chat.placeholder': 'Type your message...',
        'chat.send': 'Send',
        'chat.support.name': 'Pappa Fresh Support',
        'chat.support.status': 'Online',
        'chat.faq.title': 'Frequently Asked Questions',
        'chat.faq.storage': 'How do I store the food?',
        'chat.faq.delivery': 'Delivery times',
        'chat.faq.subscription': 'Subscription info',
        'chat.faq.portions': 'Portion calculation',
        'chat.faq.recipe': 'Change recipe',
        'chat.faq.question.storage': 'How do I store Pappa Fresh?',
        'chat.faq.question.delivery': 'What are the delivery times?',
        'chat.faq.question.subscription': 'How does the subscription work?',
        'chat.faq.question.portions': 'How do I calculate portions?',
        'chat.faq.question.recipe': 'Can I change the recipe?',
        
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
