#!/bin/bash

# 🚀 Pappa Fresh Deployment Script
# This script helps you deploy your website to Render

echo "🚀 Starting Pappa Fresh deployment process..."

# Step 1: Install dependencies
echo "📦 Installing dependencies..."
npm install

# Step 2: Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found!"
    echo "📝 Creating .env file with your Stripe keys..."
    
    cat > .env << EOF
# Stripe API Keys
STRIPE_SECRET_KEY=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
STRIPE_PUBLISHABLE_KEY=pk_live_51QP8QVBb4iMQmQdrGvs0ogUyXBPPvu82V2uFQHh5l9qIZcElyjtyWVsxSKyqyZX8R06PmLu9pTwViOdc0nVilywA00UTlpnUEU

# Server Configuration
PORT=8000
NODE_ENV=production
EOF
    
    echo "✅ .env file created!"
else
    echo "✅ .env file already exists"
fi

# Step 3: Test local build
echo "🧪 Testing local build..."
if npm start &> /dev/null & then
    PID=$!
    sleep 3
    if curl -s http://localhost:8000/health > /dev/null; then
        echo "✅ Local build successful!"
        kill $PID
    else
        echo "❌ Local build failed!"
        kill $PID
        exit 1
    fi
else
    echo "❌ Failed to start local server"
    exit 1
fi

# Step 4: Git operations
echo "📤 Preparing for Git push..."

# Check if git is initialized
if [ ! -d .git ]; then
    echo "🔧 Initializing Git repository..."
    git init
fi

# Add all files
git add .

# Commit changes
git commit -m "Deploy to Render - $(date)"

echo ""
echo "🎉 Deployment preparation complete!"
echo ""
echo "📋 Next steps:"
echo "1. Create a GitHub repository"
echo "2. Push your code:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/pappa-fresh-website.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Go to https://dashboard.render.com"
echo "4. Create new Web Service"
echo "5. Connect your GitHub repository"
echo "6. Set environment variables in Render dashboard"
echo "7. Deploy!"
echo ""
echo "📚 See DEPLOY-TO-RENDER.md for detailed instructions"
echo ""
