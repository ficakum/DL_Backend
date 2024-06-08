import * as tf from "@tensorflow/tfjs-node";

import Repository from "../repositories/mongo.repository";
import ImageModel, { Image } from "../models/image.model";
import { Product } from "../models/product.model";
import productService from "./product.service";
import HttpException from "../exceptions/http.exception";

class ImageService {
  repository: Repository<Image>;

  constructor() {
    this.repository = new Repository<Image>(ImageModel);
  }

  async getImages(): Promise<Image[]> {
    const images: Image[] = (
      await this.repository.getItems(
        new Map<string, any>([
          ["searchQuery", {}],
          ["$limit", 0],
          ["$page", 1],
        ])
      )
    ).items;

    return images;
  }

  async getSimilarProductsByImages(
    embeddings: tf.Tensor<tf.Rank>
  ): Promise<Product[]> {
    const allImages: Image[] = await this.getImages();

    const treshold: number = 0.7;
    const similarImages: Image[] = [];

    allImages.forEach((image) => {
      let newFeatureVector = embeddings.arraySync();
      if (typeof newFeatureVector === "number") {
        newFeatureVector = [newFeatureVector];
      }

      const similarity: number = this.cosineSimilarity(
        image.featureVector,
        newFeatureVector[0] as number[]
      );

      if (similarity > treshold) {
        similarImages.push(image);
      }
    });

    const ids: string[] = similarImages.map((image) => image.product);

    const similarProducts = (
      await productService.getProducts(
        new Map<string, any>([
          ["searchQuery", { _id: { $in: ids } }],
          ["$limit", 0],
          ["$page", 1],
        ])
      )
    ).items;

    return similarProducts;
  }

  private cosineSimilarity(a: number[], b: number[]): number {
    if (a.length !== b.length) {
      throw new Error("Vectors must have the same length");
    }

    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < a.length; i++) {
      dotProduct += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }

    normA = Math.sqrt(normA);
    normB = Math.sqrt(normB);

    return dotProduct / (normA * normB);
  }
}

const imageService = new ImageService();

export default imageService;
