#!/bin/bash

# 🚀 Fresh Fruits & Vegetables - Deployment Script

echo "🍎 Starting Fresh Fruits & Vegetables Deployment..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build for production
echo "🔨 Building for production..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Build files are in the 'dist' folder"
    echo ""
    echo "🚀 Ready for deployment!"
    echo ""
    echo "Next steps:"
    echo "1. Upload the 'dist' folder to your hosting provider"
    echo "2. Configure environment variables on your hosting platform"
    echo "3. Update VITE_API_URL to your production backend URL"
    echo "4. Update VITE_RAZORPAY_KEY to your production Razorpay key"
    echo ""
    echo "🎉 Your Fresh Fruits & Vegetables website is ready!"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi
