import * as tf from "@tensorflow/tfjs-node";
import { NextFunction, Request, Response } from "express";

import Logger from "../utils/winston.logger";
import BadRequestException from "exceptions/badRequest.exception";
import ServerException from "exceptions/server.exception";
import { model } from "middlewares/image.upload.middleware";
import HttpException from "exceptions/http.exception";

class UserController {
  async getSimilarImages(req: Request, res: Response, next: NextFunction) {
    const { file } = req;

    try {
      if (!file) {
        throw new BadRequestException("Bad Request", "Missing image");
      }

      if (!model) {
        throw new ServerException("Server failed", "Model not loaded yet.");
      }

      // Read image buffer and decode it
      const imageBuffer = file.buffer;
      const decodedImage = tf.node.decodeImage(imageBuffer) as tf.Tensor3D;

      // Get image embeddings
      const embeddings = model.infer(decodedImage, true) as tf.Tensor;

      // const productEmbeddings: { [key: string]: tf.Tensor } = {};

      // // Find similar product embeddings with a threshold
      // const threshold = 0.7;
      // const similarProducts: { productId: string; similarity: number }[] = [];

      // Object.entries(productEmbeddings).forEach(([id, productEmbedding]) => {
      //   const similarity = cosineSimilarity(embeddings, productEmbedding);
      //   if (similarity > threshold) {
      //     similarProducts.push({ productId: id, similarity });
      //   }
      // });

      // // Sort similar products by similarity score in descending order
      // similarProducts.sort((a, b) => b.similarity - a.similarity);

      // // Respond with the similar products
      // res.json({ similarProducts });
      // Process embeddings (e.g., store or compare them)
      // For demonstration, we'll just send them back

      res.json({ embeddings: embeddings.arraySync() });
    } catch (error) {
      Logger.error(
        `Error in ${__filename} - getSimilarImages method: ${
          (error as HttpException).error_description
        }`
      );
      next(error);
    }
  }
}
