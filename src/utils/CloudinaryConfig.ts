const CloudinaryConfig = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
  folder: import.meta.env.VITE_CLOUDINARY_FOLDER,
  apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY,
};

export default CloudinaryConfig;
