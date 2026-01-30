# Backend Google OAuth Implementation

## Node.js/Express Backend Example

### 1. Install Required Packages
```bash
npm install google-auth-library jsonwebtoken
```

### 2. Google OAuth Route (server.js)
```javascript
const { GoogleAuth } = require('google-auth-library');
const jwt = require('jsonwebtoken');

const googleAuth = new GoogleAuth();

// Google Login Route
app.post('/api/auth/google-login', async (req, res) => {
  try {
    const { token, userInfo } = req.body;
    
    // Verify Google token
    const ticket = await googleAuth.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    
    // Check if user exists
    let user = await User.findOne({ email: payload.email });
    
    if (!user) {
      // Create new user
      user = new User({
        email: payload.email,
        name: payload.name,
        avatar: payload.picture,
        googleId: payload.sub,
        role: 'user',
        isActive: true,
        createdAt: new Date()
      });
      await user.save();
    } else {
      // Update last login
      user.lastLogin = new Date();
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
    console.error('Google login error:', error);
    res.status(400).json({ error: 'Google authentication failed' });
  }
});

// Google Register Route
app.post('/api/auth/google-register', async (req, res) => {
  try {
    const { token, userInfo } = req.body;
    
    // Verify Google token
    const ticket = await googleAuth.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    
    // Check if user already exists
    const existingUser = await User.findOne({ email: payload.email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Create new user
    const user = new User({
      email: payload.email,
      name: payload.name,
      avatar: payload.picture,
      googleId: payload.sub,
      role: 'user',
      isActive: true,
      createdAt: new Date()
    });
    
    await user.save();
    
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
    console.error('Google registration error:', error);
    res.status(400).json({ error: 'Google registration failed' });
  }
});
```

### 3. User Model Example
```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  avatar: { type: String },
  googleId: { type: String },
  role: { type: String, default: 'user' },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date }
});

const User = mongoose.model('User', userSchema);
```

### 4. Environment Variables (.env)
```
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
JWT_SECRET=your-jwt-secret
```

## Testing Without Backend

The frontend implementation includes a fallback that works without a backend:
- Google OAuth popup opens
- User authenticates with Google
- User info is retrieved
- User is created locally with Google data
- User can login and use the app

This allows you to test the Google OAuth flow even without a backend!
