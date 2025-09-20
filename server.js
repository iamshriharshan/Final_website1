const express = require('express');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || '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');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8000;

// Log environment info
console.log('🚀 Starting Pappa Fresh server...');
console.log('📋 Environment:', process.env.NODE_ENV || 'development');
console.log('🔑 Stripe key configured:', !!process.env.STRIPE_SECRET_KEY);
console.log('🌐 Port:', PORT);

// Middleware
app.use(express.json());
app.use(express.static('.'));

// Stripe payment intent endpoint
app.post('/create-payment-intent', async (req, res) => {
    try {
        const { amount, currency = 'eur' } = req.body;
        
        if (!amount || amount <= 0) {
            return res.status(400).json({ error: 'Invalid amount' });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: currency,
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.json({
            clientSecret: paymentIntent.client_secret
        });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({ error: 'Failed to create payment intent' });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Serve all routes with index.html for SPA-like behavior
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server with error handling
app.listen(PORT, (err) => {
    if (err) {
        console.error('❌ Failed to start server:', err);
        process.exit(1);
    }
    console.log(`🚀 Pappa Fresh server running on port ${PORT}`);
    console.log(`📱 Local: http://localhost:${PORT}`);
    console.log(`💳 Stripe payment intents enabled`);
    console.log(`✅ Server started successfully!`);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('❌ Uncaught Exception:', err);
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Rejection:', err);
    process.exit(1);
});