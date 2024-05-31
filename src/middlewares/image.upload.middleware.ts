import multer from "multer";
import * as mobilenet from "@tensorflow-models/mobilenet";

const upload = multer({ storage: multer.memoryStorage() });

let model: mobilenet.MobileNet | null = null;

// Load MobileNet model
mobilenet.load().then((loadedModel) => {
  model = loadedModel;
  console.log("MobileNet model loaded.");
});

export { upload, model };
