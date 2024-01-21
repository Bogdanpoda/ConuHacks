import axios from "axios";
import api from "../config.json";

export async function UploadImageApi(imageURI) {
  try {
    console.log("into api call!: " + imageURI);
    const response = await axios.get(api.BACKEND_API + "/GetResponse");
    if (response.status == 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
}
