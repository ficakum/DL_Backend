// import * as Jimp from "jimp";
// import * as path from "path";
// import * as mobilenet from "@tensorflow-models/mobilenet";
// import * as tf from "@tensorflow/tfjs-node";

// const image = async () => {
//   const model: mobilenet.MobileNet = await mobilenet.load();

//   const imagePath = path.join(__dirname, "111085122871_0.JPG");
//   const image = await Jimp.read(imagePath);
//   const buffer = await image.getBufferAsync(Jimp.MIME_JPEG);

//   const decodedImage: tf.Tensor3D = tf.node.decodeImage(buffer) as tf.Tensor3D;

//   // Get image embeddings
//   const embeddings: tf.Tensor<tf.Rank> = model.infer(
//     decodedImage,
//     true
//   ) as tf.Tensor;

//   // Convert embeddings to a JSON-serializable format
//   const embeddingData = embeddings.arraySync() as number[]; // Flatten the tensor to an array
//   const shape = embeddings.shape; // Get the shape of the tensor

//   console.log(embeddingData);
//   console.log(shape);
// };

// image();

import * as fs from "fs";
import * as Jimp from "jimp";
import * as path from "path";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from "@tensorflow/tfjs-node";

const processImages = async () => {
  const model: mobilenet.MobileNet = await mobilenet.load();

  const imagesDir = path.join(__dirname, "images"); // Assuming your images are in a folder named 'images'
  const imageFiles = fs.readdirSync(imagesDir);

  const results: { image: string; embeddings: number[]; shape: number[] }[] =
    [];

  for (const file of imageFiles) {
    const imagePath = path.join(imagesDir, file);
    const image = await Jimp.read(imagePath);
    const buffer = await image.getBufferAsync(Jimp.MIME_JPEG);

    const decodedImage: tf.Tensor3D = tf.node.decodeImage(
      buffer
    ) as tf.Tensor3D;

    // Get image embeddings
    const embeddings: tf.Tensor<tf.Rank> = model.infer(
      decodedImage,
      true
    ) as tf.Tensor;

    // Convert embeddings to a JSON-serializable format
    const embeddingData = embeddings.arraySync() as number[]; // Flatten the tensor to an array
    const shape = embeddings.shape; // Get the shape of the tensor

    results.push({
      image: file,
      embeddings: embeddingData,
      shape: shape,
    });

    // Clean up the tensor to release memory
    embeddings.dispose();
    decodedImage.dispose();
  }

  // Save the results to a JSON file
  fs.writeFileSync(
    path.join(__dirname, "image_embeddings.json"),
    JSON.stringify(results, null, 2)
  );
};

processImages()
  .then(() => {
    console.log("Image processing complete.");
  })
  .catch((err) => {
    console.error("Error processing images:", err);
  });
