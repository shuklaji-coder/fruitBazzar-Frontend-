# 🔐 Updated Google OAuth Setup - Correct API Names

## 🚨 **Important: API Names Have Changed!**

### **❌ Old API Names (No Longer Available)**
- ❌ Google OAuth2 API (deprecated)
- ❌ Google+ API (deprecated)

### **✅ New Correct API Names**

## 📋 **Updated Step-by-Step Guide**

### **🌐 Step 1: Go to Google Cloud Console**
**URL**: https://console.cloud.google.com/
1. **Sign in** with your Google account
2. **Accept terms** if prompted

### **🆕 Step 2: Create New Project**
1. **Click project dropdown** (top left)
2. **Click "NEW PROJECT"**
3. **Enter project name**: `FreshCart App`
4. **Click "CREATE"**

### **🔍 Step 3: Enable Correct APIs**

#### **Go to**: **APIs & Services → Library**

#### **Search and Enable These APIs**:

#### **✅ Required APIs (Updated Names)**:
```
✅ Google Identity and Access Management (IAM) API
✅ Google People API (for profile data)
✅ Google Identity Toolkit API
```

#### **Alternative APIs (if above not found)**:
```
✅ Google Sign-In API
✅ Google OAuth2 Authorization Server
```

#### **How to Enable**:
1. **Search exact API name** in search bar
2. **Click on API result**
3. **Click "ENABLE"**
4. **Wait for activation**

### **🔑 Step 4: Create OAuth 2.0 Client ID**

#### **Navigate to Credentials**:
1. **Go to "APIs & Services" → "Credentials"**
2. **Click "+ CREATE CREDENTIALS"**
3. **Select "OAuth 2.0 Client ID"**

#### **Configure OAuth Consent Screen** (if prompted):
1. **Choose "External"** (for public apps)
2. **Click "CREATE"**
3. **Fill in app details**:
   ```
   App name: FreshCart
   User support email: your-email@gmail.com
   Developer contact: your-email@gmail.com
   ```
4. **Add scopes** (permissions):
   ```
   ✅ ../auth/userinfo.email
   ✅ ../auth/userinfo.profile
   ✅ openid
   ```
5. **Add test users** (your email address)
6. **Click "SAVE AND CONTINUE"**

### **🎯 Step 5: Configure OAuth 2.0 Client ID**

#### **Application Type**:
- **Select**: "Web application"

#### **Name**:
- **Enter**: `FreshCart Web Client`

#### **Authorized JavaScript Origins**:
```
✅ http://localhost:5173
✅ http://localhost:3000
✅ http://127.0.0.1:5173
✅ http://127.0.0.1:3000
```

#### **Authorized Redirect URIs**:
```
✅ http://localhost:5173
✅ http://localhost:3000
```

#### **Click "CREATE"**

### **📱 Step 6: Get Your Client ID**

#### **After Creation**:
1. **Copy "Client ID"** (looks like this):
   ```
   672029004581-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com
   ```

2. **Copy "Client Secret"** (keep it safe)

3. **Note the "Client ID"** - this is what you need!

### **⚙️ Step 7: Update Your Environment**

#### **Update `.env` file**:
```env
# Google OAuth
VITE_GOOGLE_CLIENT_ID=672029004581-your-actual-client-id.apps.googleusercontent.com
```

### **🔄 Step 8: Restart Development Server**
```bash
npm run dev
```

## 🔍 **Alternative Method - Quick Setup**

### **If APIs are hard to find, try this**:

#### **1. Go Directly to OAuth Setup**:
**URL**: https://console.cloud.google.com/apis/credentials

#### **2. Click "+ CREATE CREDENTIALS"**
- **Select "OAuth 2.0 Client ID"**

#### **3. If it asks to configure consent screen**:
- **Click "CONFIGURE CONSENT SCREEN"**
- **Fill basic details**
- **Add any required scopes**

#### **4. Google will auto-enable required APIs** when you create OAuth Client ID!

## 🎯 **Direct Search Links**

### **Try These Direct URLs**:

#### **IAM API**:
```
https://console.cloud.google.com/apis/library/iam.googleapis.com
```

#### **Google People API**:
```
https://console.cloud.google.com/apis/library/people.googleapis.com
```

#### **Identity Toolkit API**:
```
https://console.cloud.google.com/apis/library/identitytoolkit.googleapis.com
```

#### **Credentials Direct**:
```
https://console.cloud.google.com/apis/credentials
```

## 🚨 **Troubleshooting**

### **❌ "API not found" Error**
- **Try**: Different API names from the list above
- **Try**: Direct credential setup (Google auto-enables APIs)
- **Try**: Search for "Google Sign-In" instead

### **❌ "OAuth consent screen required" Error**
- **Click**: "CONFIGURE CONSENT SCREEN" button
- **Fill**: Basic app information
- **Add**: Required scopes
- **Save**: And try again

### **❌ "Invalid origin" Error**
- **Check**: Exact URLs (no trailing slashes)
- **Check**: Using `http://localhost:5173` not `https`
- **Check**: Added all local development URLs

## 🎉 **Quick Success Path**

### **Easiest Method**:
1. **Go to**: https://console.cloud.google.com/apis/credentials
2. **Click**: "+ CREATE CREDENTIALS" → "OAuth 2.0 Client ID"
3. **Configure**: Consent screen if asked
4. **Add**: `http://localhost:5173` to origins
5. **Copy**: Client ID and update `.env`

**Google will automatically enable the required APIs! 🚀**

## ⚡ **Pro Tips**

### **✅ Search Tips**:
- **Search for**: "Google Sign-In" instead of "OAuth2"
- **Search for**: "Identity" instead of "OAuth"
- **Use**: Direct credential setup link

### **✅ API Names to Try**:
```
✅ Google Identity and Access Management (IAM) API
✅ Google People API
✅ Google Identity Toolkit API
✅ Google Sign-In API
```

### **✅ If Nothing Works**:
- **Skip API enabling** (Google does it automatically)
- **Go directly to credential creation**
- **Let Google auto-enable required APIs**

**Ab updated guide ke saath Google OAuth easily setup ho jayega! 🔐**
