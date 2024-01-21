import multer from "multer";
import express from "express";
import { uploadImageToCloudinary, chatgptVisionPrompt } from "./lib.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3000;
const upload = multer({ dest: "uploads/" });

app.post("/upload-image", upload.single("image"), async (req, res) => {
  let imageUrl = "";
  try {
    console.log(req.file);
    imageUrl = await uploadImageToCloudinary(req.file.path);
    console.log(imageUrl);
    res.json({ message: "Image uploaded successfully", imageUrl });
  } catch (error) {
    res.status(500).json({ message: "Error uploading image", error });
  }

  try {
    const data = await chatgptVisionPrompt(imageUrl);
    console.log(data);
  } catch (error) {
    console.error("Error with chatgptVisionPrompt:", error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
