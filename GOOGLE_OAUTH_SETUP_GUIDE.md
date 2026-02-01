# 🔐 Google OAuth Client ID Setup - Complete Guide

## 📋 **Step-by-Step Google Client ID Setup**

### **🌐 Step 1: Go to Google Cloud Console**

#### **URL**: https://console.cloud.google.com/

1. **Open Google Cloud Console**
2. **Sign in** with your Google account
3. **Accept terms** if prompted

---

### **🆕 Step 2: Create New Project**

#### **If you don't have a project:**

1. **Click on project dropdown** (top left)
2. **Click "NEW PROJECT"**
3. **Enter project name**: `FreshCart App` or any name
4. **Click "CREATE"**

#### **Or use existing project:**
- Select any existing project from dropdown

---

### **🔍 Step 3: Enable Required APIs**

#### **Navigate to APIs & Services**:
1. **Go to "APIs & Services"** → **"Library"**
2. **Search and enable these APIs**:

#### **Required APIs:**
```
✅ Google+ API
✅ Google OAuth2 API  
✅ Google Identity Toolkit API
✅ Google People API (optional, for profile data)
```

#### **How to enable:**
1. **Search API name** in search bar
2. **Click on API**
3. **Click "ENABLE"**
4. **Wait for activation** (usually takes a few seconds)

---

### **🔑 Step 4: Create OAuth 2.0 Client ID**

#### **Navigate to Credentials**:
1. **Go to "APIs & Services"** → **"Credentials"**
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

---

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

---

### **📱 Step 6: Get Your Client ID**

#### **After Creation**:
1. **Copy "Client ID"** (looks like this):
   ```
   672029004581-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com
   ```

2. **Copy "Client Secret"** (keep it safe)

3. **Note the "Client ID"** - this is what you need!

---

### **⚙️ Step 7: Update Your Environment**

#### **Update `.env` file**:
```env
# Google OAuth
VITE_GOOGLE_CLIENT_ID=672029004581-your-actual-client-id.apps.googleusercontent.com
```

#### **Replace** the placeholder with your real Client ID.

---

### **🔄 Step 8: Restart Development Server**

#### **Stop and restart**:
```bash
# Stop current server (Ctrl + C)
npm run dev
```

#### **This reloads environment variables**.

---

### **🧪 Step 9: Test Google OAuth**

#### **Test in your app**:
1. **Go to login page**
2. **Agree to Terms & Privacy Policy**
3. **Click "Sign in with Google"**
4. **Authenticate with Google**
5. **Should work perfectly now!**

---

## 🚨 **Important Notes**

### **✅ DO's:**
- ✅ Use exact URLs for origins
- ✅ Add your email as test user
- ✅ Keep Client ID in `.env` file
- ✅ Test with `http://localhost:5173`

### **❌ DON'Ts:**
- ❌ Don't use `https` for local development
- ❌ Don't share Client Secret
- ❌ Don't forget to add test users
- ❌ Don't use production Client ID for development

---

## 🔧 **Troubleshooting**

### **❌ "Invalid Client ID" Error**
- **Check**: Client ID copied correctly
- **Check**: No extra spaces or characters
- **Check**: Using correct environment variable

### **❌ "Unauthorized Origin" Error**
- **Check**: Added `http://localhost:5173` to origins
- **Check**: No trailing slashes in URLs
- **Check**: Using `http` not `https` for local

### **❌ "Popup Blocked" Error**
- **Check**: Browser popup blocker disabled
- **Check**: Clicking Google button (not Enter key)

---

## 🎯 **Quick Copy-Paste URLs**

### **Google Cloud Console**:
```
https://console.cloud.google.com/
```

### **APIs Library**:
```
https://console.cloud.google.com/apis/library
```

### **Credentials**:
```
https://console.cloud.google.com/apis/credentials
```

---

## 📱 **Mobile Testing**

### **For Mobile Development**:
Add these origins too:
```
✅ http://localhost:8080
✅ http://192.168.1.x:5173 (your IP)
```

---

## 🌍 **Production Setup**

### **When deploying to production**:
1. **Add production URL to origins**:
   ```
   ✅ https://yourdomain.com
   ✅ https://www.yourdomain.com
   ```

2. **Update environment variables**:
   ```env
   VITE_GOOGLE_CLIENT_ID=production-client-id.apps.googleusercontent.com
   ```

---

## 🎉 **Success!**

**Once you complete these steps, Google OAuth will work perfectly!**

### **✅ Expected Result:**
- Google Sign-In button appears
- Clicking opens Google OAuth popup
- User authenticates successfully
- User data is extracted and stored
- User is logged in and redirected

### **⏱️ Time Required**: 10-15 minutes

### **🔧 Difficulty**: Easy to Medium

**Ab aap easily Google OAuth setup kar sakte hain! 🚀**
