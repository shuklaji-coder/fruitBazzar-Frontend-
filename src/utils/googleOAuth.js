// Real Google OAuth Implementation
export const initializeGoogleOAuth = () => {
  return new Promise((resolve, reject) => {
    // Check if already loaded
    if (window.google) {
      resolve();
      return;
    }

    // Load Google OAuth script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      resolve();
    };
    
    script.onerror = () => {
      reject(new Error('Failed to load Google OAuth script'));
    };
    
    document.head.appendChild(script);
  });
};

export const handleGoogleSignIn = (clientId, onSuccess, onError) => {
  // Initialize Google OAuth
  window.google.accounts.id.initialize({
    client_id: clientId,
    callback: (response) => {
      // Decode JWT token
      const payload = decodeJWT(response.credential);
      onSuccess(payload, response);
    },
    auto_select: false,
    cancel_on_tap_outside: true,
  });

  // Show Google Sign-In popup
  window.google.accounts.id.prompt((notification) => {
    if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
      onError(new Error('Google Sign-In was not displayed'));
    }
  });
};

// Decode JWT token
const decodeJWT = (token) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
  return JSON.parse(jsonPayload);
};

// Alternative popup method
export const handleGoogleSignInPopup = (clientId, onSuccess, onError) => {
  const tokenClient = window.google.accounts.oauth2.initTokenClient({
    client_id: clientId,
    scope: 'email profile',
    callback: (response) => {
      if (response.error) {
        onError(new Error(response.error));
        return;
      }
      
      // Get user info with access token
      fetchGoogleUserInfo(response.access_token)
        .then(userInfo => {
          onSuccess(userInfo, response);
        })
        .catch(error => {
          onError(error);
        });
    },
  });
  
  tokenClient.requestAccessToken();
};

// Fetch user info from Google
export const fetchGoogleUserInfo = async (accessToken) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch user info');
  }
  
  return response.json();
};
