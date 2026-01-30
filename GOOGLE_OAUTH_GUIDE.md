# 🔐 Google OAuth Integration Guide

## 📋 Current Implementation

### ✅ **Mock Google Login** (Currently Working)
- **Login Page**: Simulated Google login with mock user data
- **Register Page**: Simulated Google registration with mock user data
- **User Experience**: Shows success toast and navigates to home
- **Visual Design**: Professional Google button with proper branding

### 🔄 **Real Google OAuth** (For Production)

## 🛠️ Steps to Implement Real Google OAuth

### 1. **Get Google OAuth Credentials**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable **Google+ API** and **Google OAuth2 API**
4. Create **OAuth 2.0 Client ID**
5. Download **Client Secret** and keep it secure

### 2. **Install Required Packages**
```bash
npm install @google-cloud/google-auth-library
# or
npm install react-google-login
```

### 3. **Environment Variables**
Add to your `.env` file:
```env
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
VITE_GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 4. **Real Google Login Implementation**

#### **Option 1: Using react-google-login**
```javascript
// Install: npm install react-google-login
import { GoogleLogin } from 'react-google-login';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const handleGoogleLogin = async (response) => {
  try {
    // Send Google token to your backend
    const res = await fetch(`${API_URL}/api/auth/google-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: response.credential
      })
    });
    
    const user = await res.json();
    
    // Save user data
    localStorage.setItem("token", user.token);
    localStorage.setItem("email", user.email);
    localStorage.setItem("role", user.role);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", "true");
    
    navigate("/");
  } catch (error) {
    console.error("Google login error:", error);
    setError("Google login failed. Please try again.");
  }
};

// In your JSX
<GoogleLogin
  clientId={clientId}
  buttonText="Continue with Google"
  onSuccess={handleGoogleLogin}
  onFailure={(error) => console.log(error)}
  cookiePolicy={'single_host_origin'}
  theme="outline"
/>
```

#### **Option 2: Manual Google OAuth Implementation**
```javascript
const handleGoogleLogin = async () => {
  try {
    // Load Google API
    await loadGoogleScript();
    
    // Initialize Google OAuth
    const tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      scope: 'email profile',
      callback: async (response) => {
        // Send token to backend
        const res = await fetch(`${API_URL}/api/auth/google-login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token: response.access_token
          })
        });
        
        const user = await res.json();
        
        // Save user data and navigate
        localStorage.setItem("token", user.token);
        localStorage.setItem("email", user.email);
        localStorage.setItem("role", user.role);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("isLoggedIn", "true");
        
        navigate("/");
      },
    });
    
    // Show popup
    tokenClient.requestAccessToken();
  } catch (error) {
    console.error("Google OAuth error:", error);
    setError("Google login failed. Please try again.");
  }
};

// Load Google API script
const loadGoogleScript = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};
```

### 5. **Backend Implementation**
```javascript
// Example backend route (Node.js/Express)
app.post('/api/auth/google-login', async (req, res) => {
  try {
    const { token } = req.body;
    
    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    });
    
    // Get user info from Google
    const payload = ticket.getPayload();
    
    // Check if user exists in your database
    let user = await User.findOne({ email: payload.email });
    
    if (!user) {
      // Create new user
      user = new User({
        email: payload.email,
        name: payload.name,
        avatar: payload.picture,
        googleId: payload.sub,
        role: 'user',
        isActive: true
      });
      await user.save();
    }
    
    // Generate JWT token
    const jwtToken = jwt.sign(
      { 
        id: user._id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({
      token: jwtToken,
      email: user.email,
      role: user.role,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(400).json({ error: 'Google authentication failed' });
  }
});
```

## 🎯 **Current Mock Implementation**

### **Login Page Google Button**
```javascript
const handleGoogleLogin = () => {
  setError("");
  setIsLoading(true);
  
  // Simulate Google login success
  setTimeout(() => {
    const mockGoogleUser = {
      email: "user@gmail.com",
      name: "Google User",
      token: "mock-google-token",
      role: "user"
    };
    
    localStorage.setItem("token", mockGoogleUser.token);
    localStorage.setItem("email", mockGoogleUser.email);
    localStorage.setItem("role", mockGoogleUser.role);
    localStorage.setItem("user", JSON.stringify(mockGoogleUser));
    localStorage.setItem("isLoggedIn", "true");
    
    setShowSuccess(true);
    setTimeout(() => {
      navigate("/");
    }, 1500);
  }, 1500);
};
```

### **Register Page Google Button**
```javascript
const handleGoogleRegister = () => {
  setError("");
  setIsLoading(true);
  
  // Simulate Google registration success
  setTimeout(() => {
    const mockGoogleUser = {
      email: "user@gmail.com",
      name: "Google User",
      token: "mock-google-token",
      role: "user"
    };
    
    localStorage.setItem("token", mockGoogleUser.token);
    localStorage.setItem("email", mockGoogleUser.email);
    localStorage.setItem("role", mockGoogleUser.role);
    localStorage.setItem("user", JSON.stringify(mockGoogleUser));
    localStorage.setItem("isLoggedIn", "true");
    
    setShowSuccess(true);
    setTimeout(() => {
      navigate("/");
    }, 1500);
  }, 1500);
};
```

## 🚀 **Deployment Considerations**

### **For Production**
1. **Replace mock implementation** with real Google OAuth
2. **Use environment variables** for sensitive credentials
3. **Implement backend token verification**
4. **Add proper error handling**
5. **Test thoroughly** in staging environment

### **Security Best Practices**
- **Never expose client secrets** in frontend code
- **Always verify tokens** on the backend
- **Use HTTPS** in production
- **Implement rate limiting** for auth endpoints
- **Add CSRF protection** for forms

## 🎨 **Current Status**

✅ **Mock Google Login**: Working perfectly for demo purposes
✅ **Visual Design**: Professional Google buttons with proper branding
✅ **User Experience**: Smooth flow with success feedback
✅ **Terms Agreement**: Required before Google auth
✅ **Error Handling**: Proper error messages and validation

🔄 **Next Steps**: Implement real Google OAuth when ready for production

## 📞 **Testing**

### **Current Mock Testing**
1. Click Google button → Shows loading state
2. After 1.5 seconds → Shows success toast
3. Navigates to home page
4. User is logged in with mock data

### **Real OAuth Testing**
1. Configure Google OAuth credentials
2. Test with real Google account
3. Verify token verification
4. Test user creation flow
5. Test error scenarios

---

**Your Google login is working with mock data! 🎉**

For production, follow the steps above to implement real Google OAuth integration.
