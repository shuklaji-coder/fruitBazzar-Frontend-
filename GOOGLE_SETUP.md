# Google OAuth Integration Setup

## Step 1: Get Google OAuth Credentials

### 1. Go to Google Cloud Console
1. Visit: https://console.cloud.google.com/
2. Create a new project or select existing one
3. Enable APIs:
   - Google+ API
   - Google OAuth2 API

### 2. Create OAuth 2.0 Client ID
1. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
2. Select "Web application"
3. Add authorized origins:
   - http://localhost:5174 (for development)
   - https://yourdomain.com (for production)
4. Add authorized redirect URIs:
   - http://localhost:5174 (for development)
   - https://yourdomain.com (for production)
5. Download the JSON file with credentials

## Step 2: Update Environment Variables

Add to your .env file:
```
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

## Step 3: Install Required Package
```bash
npm install @google-cloud/google-auth-library
```

## Step 4: Update Login Component

Replace the mock handleGoogleLogin function with real implementation.
