import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.config';

export const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: 'product',
      allowed_formats: ['jpg', 'png', 'jpeg'],
      transformation: [{ width: 800, height: 800, crop: 'limit' }],
    };
  },
});