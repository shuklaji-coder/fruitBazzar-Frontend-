// Image Upload Utility Functions

export const validateImageFile = (file) => {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  
  // Check file type
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file type. Please upload JPG, PNG, GIF, or WebP images.'
    };
  }
  
  // Check file size
  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'File size must be less than 5MB.'
    };
  }
  
  return { valid: true };
};

export const compressImage = async (file, quality = 0.8) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;
      const maxSize = 800; // Max dimension
      
      if (width > height) {
        if (width > maxSize) {
          height = (height * maxSize) / width;
          width = maxSize;
        }
      } else {
        if (height > maxSize) {
          width = (width * maxSize) / height;
          height = maxSize;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob(
        (blob) => {
          resolve(new File([blob], file.name, { type: 'image/jpeg' }));
        },
        'image/jpeg',
        quality
      );
    };
    
    img.src = URL.createObjectURL(file);
  });
};

export const uploadToCloudinary = async (file) => {
  // This is a placeholder for cloud upload
  // You can integrate with Cloudinary, AWS S3, or any cloud service
  
  const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/image/upload';
  const CLOUDINARY_UPLOAD_PRESET = 'your_upload_preset'; // Set this in Cloudinary
  
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  
  try {
    const response = await fetch(CLOUDINARY_URL, {
      method: 'POST',
      body: formData
    });
    
    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Cloud upload error:', error);
    throw error;
  }
};

export const createImagePreview = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(file);
  });
};

// Multiple image upload handler
export const handleMultipleImageUpload = async (files, maxImages = 5) => {
  const validFiles = [];
  const errors = [];
  
  for (let i = 0; i < Math.min(files.length, maxImages); i++) {
    const file = files[i];
    const validation = validateImageFile(file);
    
    if (validation.valid) {
      validFiles.push(file);
    } else {
      errors.push({ file: file.name, error: validation.error });
    }
  }
  
  return { validFiles, errors };
};

// Image optimization for web
export const optimizeImageForWeb = async (file) => {
  const compressedFile = await compressImage(file, 0.7);
  return compressedFile;
};
