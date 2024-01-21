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

    console.log(data.message.content);

    if (data.message.content.indexOf("[") < data.message.content.indexOf("{")) {
      data = data.message.content.substring(
        data.message.content.indexOf("["),
        data.message.content.lastIndexOf("]") + 1
      );
    } else  {
      data = data.message.content.substring(
        data.message.content.indexOf("{"),
        data.message.content.lastIndexOf("}") + 1
      );
      }

    data = JSON.parse(data);
    data = canWePark(data);

    console.log(data);

    res.json({
      message: "Data parsed successfully",
      data: data,
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Error parsing data", error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
