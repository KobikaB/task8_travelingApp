import axios from "axios";
import cloudinary from "./CloudinaryConfig";

const uploadImageToCloudinary = async (
  file: File,
  folder: string 
): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", cloudinary.uploadPreset);
  formData.append("folder", folder);
  

  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloudinary.cloudName}/image/upload`,
    formData
  );

  return res.data.secure_url;
};

export default uploadImageToCloudinary;
