import * as tf from "@tensorflow/tfjs-node";
import { NextFunction, Request, Response } from "express";

import Logger from "../utils/winston.logger";
import BadRequestException from "exceptions/badRequest.exception";
import ServerException from "exceptions/server.exception";
import { model } from "middlewares/image.upload.middleware";
import HttpException from "exceptions/http.exception";
import { Product } from "models/product.model";
import imageService from "services/image.service";

class ImageController {
  async getSimilarProductsByImages(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { file } = req;

    try {
      if (!file) {
        throw new BadRequestException("Bad Request", "Missing image");
      }

      if (!model) {
        throw new ServerException("Server failed", "Model not loaded yet.");
      }

      // Read image buffer and decode it
      const imageBuffer: Buffer = file.buffer;
      const decodedImage: tf.Tensor3D = tf.node.decodeImage(
        imageBuffer
      ) as tf.Tensor3D;

      // Get image embeddings
      const embeddings: tf.Tensor<tf.Rank> = model.infer(
        decodedImage,
        true
      ) as tf.Tensor;

      const similarProducts: Product[] =
        await imageService.getSimilarProductsByImages(embeddings);

      // For demonstration, we'll just send them back
      res.status(200).json(similarProducts);
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

const imageController: ImageController = new ImageController();

export default imageController;
