import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

console.log('✅ Cloudinary configured successfully');

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "Social_app",
    resource_type: "auto",
  }),
});

const upload = multer({ storage, limits: { files: 4 } });

export default upload;
