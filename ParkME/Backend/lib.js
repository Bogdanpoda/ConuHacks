import { v2 as cloudinary } from "cloudinary";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const openai = new OpenAI(process.env.OPENAI_API_KEY);

const uploadImageToCloudinary = async (imagePath) => {
  console.log("Uploading image to Cloudinary");
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: "parking_signs",
    });
    console.log("Image uploaded successfully");
    return result.secure_url; // Returns the URL of the uploaded image
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

const chatgptVisionPrompt = async (imageUrl) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Examine parking sign image; return JSON. English. Strictly follow the format (array of objects): { 'RestrictionType':  'No Parking' || 'No Stopping' || 'Reserved', 'ReservedFor': number (Permit number if Reserved), 'Months': 'startingMonth - endingMonth', 'Days': [array of days], 'Hours': '', 'Arrow': boolean }.",
          },
          {
            type: "image_url",
            image_url: {
              url: imageUrl,
            },
          },
        ],
      },
    ],
    max_tokens: 300,
  });
  return response.choices[0];
};

export { uploadImageToCloudinary, chatgptVisionPrompt };
