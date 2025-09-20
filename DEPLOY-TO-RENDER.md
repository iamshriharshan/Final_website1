# 🚀 Deploy Pappa Fresh to Render - Complete Guide

## 📋 **Prerequisites**

- GitHub account with your code pushed
- Render account (free tier available)
- Stripe API keys (already configured)

## 🔧 **Step 1: Prepare Your Project**

### **Create .env file** (in your project root)
```bash
# Stripe API Keys
STRIPE_SECRET_KEY=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
STRIPE_PUBLISHABLE_KEY=pk_live_51QP8QVBb4iMQmQdrGvs0ogUyXBPPvu82V2uFQHh5l9qIZcElyjtyWVsxSKyqyZX8R06PmLu9pTwViOdc0nVilywA00UTlpnUEU

# Server Configuration
PORT=8000
NODE_ENV=production
```

### **Install dotenv dependency**
```bash
npm install dotenv
```

## 📤 **Step 2: Push to GitHub**

### **Initialize Git (if not already done)**
```bash
git init
git add .
git commit -m "Initial commit - Pappa Fresh website"
```

### **Create GitHub repository and push**
```bash
git remote add origin https://github.com/YOUR_USERNAME/pappa-fresh-website.git
git branch -M main
git push -u origin main
```

## 🌐 **Step 3: Deploy to Render**

### **1. Go to Render Dashboard**
- Visit: https://dashboard.render.com
- Sign up/Login with GitHub

### **2. Create New Web Service**
- Click "New +" button
- Select "Web Service"
- Connect your GitHub repository

### **3. Configure Web Service**

**Basic Settings:**
- **Name**: `pappa-fresh-website`
- **Environment**: `Node`
- **Region**: Choose closest to your customers (e.g., Frankfurt for EU)
- **Branch**: `main`
- **Root Directory**: Leave empty (root of repo)

**Build & Deploy Settings:**
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Environment Variables:**
Add these in the Render dashboard:
```
STRIPE_SECRET_KEY = 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
STRIPE_PUBLISHABLE_KEY = pk_live_51QP8QVBb4iMQmQdrGvs0ogUyXBPPvu82V2uFQHh5l9qIZcElyjtyWVsxSKyqyZX8R06PmLu9pTwViOdc0nVilywA00UTlpnUEU
NODE_ENV = production
```

### **4. Deploy**
- Click "Create Web Service"
- Render will automatically build and deploy your app
- Wait for deployment to complete (usually 2-5 minutes)

## 🔗 **Step 4: Update Frontend URLs**

### **Update checkout.html with your Render URL**
Replace the fetch URL in checkout.html:
```javascript
// Before (local)
const response = await fetch("/create-payment-intent", {

// After (Render)
const response = await fetch("https://your-app-name.onrender.com/create-payment-intent", {
```

### **Update test-payment.html**
```javascript
// Update the fetch URL to your Render domain
const response = await fetch("https://your-app-name.onrender.com/create-payment-intent", {
```

## 🌍 **Step 5: Test Your Deployment**

### **Test URLs:**
- **Main Site**: `https://your-app-name.onrender.com`
- **Trial Calculator**: `https://your-app-name.onrender.com/trial.html`
- **Cart**: `https://your-app-name.onrender.com/cart.html`
- **Checkout**: `https://your-app-name.onrender.com/checkout.html`
- **Chat**: `https://your-app-name.onrender.com/chat.html`

### **Test Payment Flow:**
1. Complete trial calculator
2. Add products to cart
3. Go through checkout
4. Test Stripe payment (use test card: 4242 4242 4242 4242)

## 🔧 **Step 6: Custom Domain (Optional)**

### **Add Custom Domain in Render:**
1. Go to your web service in Render
2. Click "Settings" → "Custom Domains"
3. Add your domain (e.g., `www.pappafresh.com`)
4. Update DNS records as instructed by Render

## 📱 **Step 7: Environment-Specific Configuration**

### **Development vs Production:**
- **Local**: Uses localhost:8000
- **Render**: Uses your Render URL
- **Stripe**: Same live keys for both

### **Update Frontend URLs Dynamically:**
```javascript
// In your JavaScript files, detect environment
const isProduction = window.location.hostname !== 'localhost';
const baseUrl = isProduction 
  ? 'https://your-app-name.onrender.com' 
  : 'http://localhost:8000';

// Use baseUrl for API calls
const response = await fetch(`${baseUrl}/create-payment-intent`, {
```

## 🚨 **Important Security Notes**

### **Environment Variables:**
- ✅ **DO**: Store sensitive keys in Render environment variables
- ❌ **DON'T**: Commit .env file to GitHub
- ✅ **DO**: Use .gitignore to exclude .env

### **Stripe Keys:**
- ✅ **DO**: Use live keys for production
- ✅ **DO**: Keep keys secure and rotate if compromised
- ❌ **DON'T**: Share keys publicly

## 📊 **Monitoring & Maintenance**

### **Render Dashboard Features:**
- **Logs**: View real-time application logs
- **Metrics**: Monitor performance and errors
- **Deployments**: Automatic deployments on git push
- **Health Checks**: Automatic health monitoring

### **Set up Monitoring:**
1. Enable health checks in Render
2. Set up error logging
3. Monitor Stripe webhook deliveries
4. Track payment success rates

## 🔄 **Continuous Deployment**

### **Automatic Deployments:**
- Every push to `main` branch triggers deployment
- Render automatically runs `npm install` and `npm start`
- Zero-downtime deployments
- Easy rollback to previous versions

## 💰 **Costs & Limits**

### **Free Tier:**
- **Builds**: 500 minutes/month
- **Runtime**: 750 hours/month
- **Bandwidth**: 100GB/month
- **Perfect for small to medium websites**

### **Paid Plans:**
- Start at $7/month for more resources
- Unlimited builds and runtime
- Better performance and reliability

## 🆘 **Troubleshooting**

### **Common Issues:**

**1. Build Failures:**
```bash
# Check package.json has correct dependencies
npm install
npm start
```

**2. Environment Variables:**
- Verify all variables are set in Render dashboard
- Check variable names match exactly

**3. Port Issues:**
- Render automatically sets PORT environment variable
- Your server.js already handles this correctly

**4. Stripe Integration:**
- Test with Stripe test mode first
- Verify webhook endpoints are accessible
- Check Stripe dashboard for errors

## 🎉 **Success Checklist**

- ✅ Code pushed to GitHub
- ✅ Render web service created
- ✅ Environment variables configured
- ✅ Build successful
- ✅ Website accessible via Render URL
- ✅ Payment system working
- ✅ All features functional
- ✅ Custom domain configured (optional)

---

**🚀 Your Pappa Fresh website is now live on Render with full Stripe payment integration!**

**Next Steps:**
1. Test all functionality thoroughly
2. Set up monitoring and alerts
3. Configure custom domain if desired
4. Monitor performance and user feedback
5. Set up backup and recovery procedures
