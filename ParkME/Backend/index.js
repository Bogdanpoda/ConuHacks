import multer from "multer";
import express from "express";
import { uploadImageToCloudinary, chatgptVisionPrompt } from "./lib.js";
import {
  canWePark,
  canYouPark,
  findTimeLeftForArray,
} from "./timeDeterminator.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3000;
const upload = multer({ dest: "uploads/" });

app.post("/upload-image", upload.single("image"), async (req, res) => {
  let imageUrl = "";
  try {
    imageUrl = await uploadImageToCloudinary(req.file.path);
  } catch (error) {
    res.status(500).json({ message: "Error uploading image", error });
  }

  try {
    let data = await chatgptVisionPrompt(imageUrl);

    if (data.message.content.at(8) == "[") {
      data = data.message.content.substring(
        data.message.content.indexOf("["),
        data.message.content.lastIndexOf("]") + 1
      );
    } else if (data.message.content.at(8) == "{") {
      data = data.message.content.substring(
        data.message.content.indexOf("{"),
        data.message.content.lastIndexOf("}") + 1
      );
    } else {
      data = data.message.content;
    }

    data = JSON.parse(data);
    data = canWePark(data);

    res.json({
      message: "Data parsed successfully",
      data: data,
    });
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
