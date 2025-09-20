// Pappa Fresh - Chat & AI Support

import { getTranslation } from './language.js';
import { getCookie } from './cookie-utils.js';

// Conversation history storage
let conversationHistory = [];

// Chat functionality
export function initializeChatPage() {
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    
    // Set initial welcome message based on current website language
    setInitialWelcomeMessage();
    
    if (chatForm) {
        chatForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const message = chatInput.value.trim();
            if (message) {
                addChatMessage(message, 'user');
                chatInput.value = '';
                
                // Create streaming message element
                const { messageWrapper, messageContent } = addStreamingMessage('bot');
                
                try {
                    // Add user message to conversation history
                    conversationHistory.push({ role: 'user', content: message });
                    
                    // Try streaming first
                    const response = await getStreamingAIResponse(message, (chunk) => {
                        // The chunk already contains the full accumulated text
                        updateStreamingMessage(messageContent, chunk);
                    });
                    
                    // Add bot response to conversation history
                    conversationHistory.push({ role: 'assistant', content: response });
                    
                    // Finish streaming when complete
                    finishStreamingMessage(messageWrapper);
                } catch (error) {
                    console.error('Chat error:', error);
                    const fallbackResponse = getBotFallbackResponse(message);
                    updateStreamingMessage(messageContent, fallbackResponse);
                    
                    // Add fallback response to conversation history
                    conversationHistory.push({ role: 'assistant', content: fallbackResponse });
                    
                    // Finish streaming even on error
                    finishStreamingMessage(messageWrapper);
                }
            }
        });
    }
}

// Set initial welcome message based on current website language
function setInitialWelcomeMessage() {
    const messagesContainer = document.getElementById('chat-messages');
    if (!messagesContainer) return;
    
    // Clear existing welcome message
    const existingWelcome = messagesContainer.querySelector('.message.bot');
    if (existingWelcome) {
        existingWelcome.remove();
    }
    
    // Clear conversation history for fresh start
    conversationHistory = [];
    
    // Get current website language
    const currentLang = getCurrentWebsiteLanguage();
    
    // Add appropriate welcome message using translation
    const welcomeMessage = getTranslation('chat.welcome');
    
    addChatMessage(welcomeMessage, 'bot');
}

// Get current website language from language selector
function getCurrentWebsiteLanguage() {
    const activeLangSwitch = document.querySelector('.lang-switch.active');
    if (activeLangSwitch) {
        return activeLangSwitch.getAttribute('data-lang') || 'it';
    }
    
    // Fallback to checking cookies
    return getCookie('preferred-language') || 'it';
}

// Chat UI helper to append messages to the chat window
export function addChatMessage(text, sender) {
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

// Chat UI helper to add streaming message and update it
export function addStreamingMessage(sender = 'bot') {
    const messagesContainer = document.getElementById('chat-messages');
    if (!messagesContainer) return null;

    const messageWrapper = document.createElement('div');
    messageWrapper.className = `message ${sender === 'user' ? 'user' : 'bot'} streaming`;

    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.innerHTML = '';

    messageWrapper.appendChild(messageContent);
    messagesContainer.appendChild(messageWrapper);

    // Auto-scroll to latest message
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    return { messageWrapper, messageContent };
}

// Update streaming message content
export function updateStreamingMessage(messageElement, text) {
    if (!messageElement) return;
    
    // Basic formatting: preserve line breaks
    messageElement.innerHTML = (text || '').toString().replace(/\n/g, '<br>');
    
    // Auto-scroll to latest message
    const messagesContainer = document.getElementById('chat-messages');
    if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

// Finish streaming message (remove streaming class and cursor)
export function finishStreamingMessage(messageWrapper) {
    if (messageWrapper) {
        messageWrapper.classList.remove('streaming');
    }
}

export async function getAIResponse(message) {
    const API_KEY = 'AIzaSyADHd4Cq4Nvr6tNqwxiWCXj3f4YMd2pV6E';
    const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
    
    // Get current website language (this takes priority)
    const websiteLanguage = getCurrentWebsiteLanguage();
    
    // Build conversation history context
    let conversationContext = '';
    if (conversationHistory.length > 0) {
        conversationContext = '\n\nCONVERSATION HISTORY:\n';
        conversationHistory.slice(-6).forEach(entry => { // Keep last 6 messages for context
            conversationContext += `${entry.role === 'user' ? 'Customer' : 'Assistant'}: "${entry.content}"\n`;
        });
    }
    
    const context = `You are Pappa Fresh's customer support assistant, specializing in fresh dog food made with human-grade ingredients for the Italian market.

CRITICAL LANGUAGE RULES:
1. ALWAYS respond in ${websiteLanguage === 'en' ? 'ENGLISH' : 'ITALIAN'} - this is the website's current language.
2. The customer is using a ${websiteLanguage === 'en' ? 'English' : 'Italian'} interface.
3. Maintain consistency throughout the entire conversation in ${websiteLanguage === 'en' ? 'English' : 'Italian'}.
4. NEVER switch languages during the conversation.
5. If the customer writes in a different language, still respond in ${websiteLanguage === 'en' ? 'English' : 'Italian'}.

DOMAIN CONSTRAINTS:
- Answer ONLY questions related to Pappa Fresh, dogs, and dog nutrition.
- Politely refuse unrelated topics with a brief message.

PRODUCT KNOWLEDGE:
All packets are 400 g and cost €6.66 each. Recipes:
- Manzo (Beef): 60% beef, carrots, zucchini, brown rice — 130 kcal/100 g
- Pollo (Chicken): 65% chicken, sweet potatoes, spinach, quinoa — 120 kcal/100 g
- Tacchino (Turkey): 60% turkey, pumpkin, broccoli, pearl barley — 110 kcal/100 g
- Equino (Horse): 60% horse (hypoallergenic), carrots, peas, basmati rice — 140 kcal/100 g
- Maiale (Pork): 60% pork, apples, fennel, spelt — 150 kcal/100 g

KEY FACTS:
- Fresh, human-grade ingredients
- Refrigerated delivery across Italy in 24–48 hours (sometimes 24–72 h depending on region)
- Flexible subscription with 10% discount
- Vet-developed balanced recipes
- Store opened packs in fridge for 3–4 days
- Can freeze up to 3 months
- Meals developed by vets in their clinics, delivered fresh to homes

TONE & STYLE:
- Concise, friendly, professional
- Helpful tone for pet owners
- Maintain natural conversation flow
- Don't repeat information already provided in the conversation

SPECIAL INSTRUCTIONS FOR RECIPE CHANGES:
- When asked "Can I change the recipe?" or "Posso cambiare ricetta?", respond: "Yes, you can absolutely change the recipe in your subscription! You can adjust your order at any time through your account on our website. Would you like me to guide you through the process?" (in appropriate language)
- When user says "Yes" to recipe change guidance, provide step-by-step instructions naturally without repeating the same response
- If user has already received recipe change instructions, acknowledge this and ask if they need help with any specific step

EXAMPLE CONVERSATIONS:

1) English — Product info
Customer: "Hi, what's in the Beef option and how many calories per serving?"
Assistant: "Hello! Our Beef (Manzo) recipe has 60% beef, carrots, zucchini, and brown rice, with about 130 kcal per 100 g. Each 400 g pouch is around 520 kcal. Can I help you with anything else?"

2) Italian — Subscription
Cliente: "Come funziona l'abbonamento e qual è lo sconto?"
Assistente: "Certo! Il nostro abbonamento è flessibile e offre uno sconto del 10% sul prezzo di ogni confezione da €6,66. La consegna è refrigerata e arriva entro 24–48 ore in tutta Italia. Vuoi che ti aiuti a configurarlo?"

3) English — Storage
Customer: "Once I open a packet, how long can I keep it? Can I freeze it?"
Assistant: "After opening, refrigerate and use within 3–4 days. For longer storage, you can freeze it up to 3 months."

4) Italian — Delivery
Cliente: "Quanto tempo ci vuole per la consegna da voi?"
Assistente: "La consegna è refrigerata e avviene in tutta Italia entro 24–48 ore dall'ordine (a volte 24–72 ore a seconda della zona). Vuoi che verifichi i tempi per il tuo indirizzo?"

5) English — Recipe change
Customer: "Can I change the recipe?"
Assistant: "Yes, you can absolutely change the recipe in your subscription! You can adjust your order at any time through your account on our website. Would you like me to guide you through the process?"
Customer: "Yes"
Assistant: "Perfect! Here's how to change the recipe in your subscription:\n\n1. Log into your account on our website\n2. Go to 'My Orders' or 'Subscription' section\n3. Click 'Modify Order' or 'Change Recipe'\n4. Select the new recipe you prefer\n5. Confirm the changes\n\nThe changes will be applied to your next delivery. Do you need help with any specific step?"

6) Italian — Recipe change
Cliente: "Posso cambiare ricetta?"
Assistente: "Sì, puoi assolutamente cambiare la ricetta nel tuo abbonamento! Puoi modificare il tuo ordine in qualsiasi momento attraverso il tuo account sul nostro sito web. Vorresti che ti guidi attraverso il processo?"
Cliente: "Sì"
Assistente: "Perfetto! Ecco come cambiare la ricetta nel tuo abbonamento:\n\n1. Accedi al tuo account sul nostro sito web\n2. Vai alla sezione 'I Miei Ordini' o 'Abbonamento'\n3. Clicca su 'Modifica Ordine' o 'Cambia Ricetta'\n4. Seleziona la nuova ricetta che preferisci\n5. Conferma le modifiche\n\nLe modifiche saranno applicate alla prossima consegna. Hai bisogno di aiuto con qualche passaggio specifico?"

7) English — Off-topic refusal
Customer: "Can you recommend cat food or answer about my car insurance?"
Assistant: "I'm sorry, but I can only assist with questions related to Pappa Fresh, dogs, and nutrition. Would you like details on one of our recipes?"

8) Italian — Vet info
Cliente: "Chi ha sviluppato le vostre ricette e da quanto tempo ve le mandate?"
Assistente: "Le nostre ricette sono sviluppate dai nostri veterinari direttamente nelle cliniche per garantire un'alimentazione equilibrata. Il cibo è fresco, di qualità umana, consegnato a casa in 24–72 ore. Posso aiutarti con altro?"

${conversationContext}

IMPORTANT: The customer's current message is: "${message}"
DETECT the language and respond in EXACTLY the same language. Maintain natural conversation flow and don't repeat information already provided.`;

    try {
        const response = await fetch(`${API_URL}?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    role: 'user',
                    parts: [{ text: context }]
                }]
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const aiResponse = data.candidates[0].content.parts[0].text;
        
        if (aiResponse) {
            return aiResponse;
        } else {
            throw new Error('No response from AI');
        }

    } catch (error) {
        console.error('AI API Error:', error);
        return getBotFallbackResponse(message);
    }
}

// Simulated streaming AI response function (using regular API with word-by-word display)
export async function getStreamingAIResponse(message, onChunk) {
    try {
        // Get the full response using the regular API
        const fullResponse = await getAIResponse(message);
        
        if (!fullResponse) {
            throw new Error('No response from AI');
        }

        // Simulate streaming by displaying words one by one
        const words = fullResponse.split(' ');
        let currentText = '';
        
        for (let i = 0; i < words.length; i++) {
            const newWord = (i > 0 ? ' ' : '') + words[i];
            currentText += newWord;
            onChunk(currentText); // Pass the full accumulated text
            
            // Add a small delay between words for realistic streaming effect
            await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 100));
        }

        return fullResponse;

    } catch (error) {
        console.error('Streaming AI API Error:', error);
        // Fallback to non-streaming response
        const fallbackResponse = getBotFallbackResponse(message);
        onChunk(fallbackResponse);
        return fallbackResponse;
    }
}

export function getBotFallbackResponse(message) {
    // Use website language instead of detecting from message
    const lang = getCurrentWebsiteLanguage();

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
    
    // Check for exact keyword matches first
    for (const [key, response] of Object.entries(dict)) {
        if (lowercaseMessage.includes(key)) return response;
    }

    // Check if message is related to Pappa Fresh
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

export function detectLanguage(text) {
    const t = (text || '').toLowerCase();
    
    // Enhanced language detection with more Italian and English indicators
    const italianHints = [
        ' il ', ' lo ', ' la ', ' gli ', ' le ', ' dei ', ' delle ', ' degli ', ' ciao', ' come ', ' cosa ', ' grazie', 
        ' per ', ' posso', ' ordin', ' spedizion', ' abbonam', ' prezzo', ' ingredient', ' nutrizion', ' quanto', 
        ' quando', ' dove', ' chi', ' quale', ' quali', ' questo', ' questa', ' questi', ' queste', ' sono', ' hai',
        ' abbiamo', ' voglio', ' vorrei', ' puoi', ' potrebbe', ' grazie', ' prego', ' scusa', ' mi dispiace'
    ];
    
    const englishHints = [
        ' the ', ' and ', ' or ', ' how ', ' what ', ' thanks', ' please', ' order', ' shipping', ' subscription', 
        ' price', ' ingredient', ' nutrition', ' when', ' where', ' who', ' which', ' this', ' that', ' these', 
        ' those', ' are', ' have', ' want', ' would', ' could', ' can', ' thank you', ' sorry', ' excuse me'
    ];
    
    const itScore = italianHints.reduce((s, k) => s + (t.includes(k) ? 1 : 0), 0);
    const enScore = englishHints.reduce((s, k) => s + (t.includes(k) ? 1 : 0), 0);
    
    // Default to English if scores are equal, but prefer Italian for Italian-specific words
    if (itScore > enScore || (itScore === enScore && t.includes('pappa'))) {
        return 'it';
    }
    return 'en';
}

// Helper function for asking questions programmatically
export function askQuestion(question) {
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        chatInput.value = question;
        document.getElementById('chat-form').dispatchEvent(new Event('submit'));
    }
}

// Helper function to ask FAQ questions in the correct language
export function askFAQQuestion(questionKey) {
    const question = getTranslation(questionKey);
    askQuestion(question);
}

// Handle language switching during chat session
export function handleLanguageSwitch() {
    // Clear conversation history when language changes
    conversationHistory = [];
    
    // Update welcome message when language is switched
    setInitialWelcomeMessage();
    
    // Add a system message about language change
    const currentLang = getCurrentWebsiteLanguage();
    const languageChangeMessage = currentLang === 'en' 
        ? 'Language switched to English. I will now respond in English.'
        : 'Lingua cambiata in italiano. Ora risponderò in italiano.';
    
    addChatMessage(languageChangeMessage, 'bot');
}

// Export the getCurrentWebsiteLanguage function for external use
export { getCurrentWebsiteLanguage };

// Make askFAQQuestion available globally for HTML onclick handlers
window.askFAQQuestion = askFAQQuestion;
