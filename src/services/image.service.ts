import * as tf from "@tensorflow/tfjs-node";

import Repository from "../repositories/mongo.repository";
import ImageModel, { Image } from "../models/image.model";
import { Product } from "../models/product.model";
import productService from "./product.service";

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
      const imageVector: tf.Tensor<tf.Rank> = tf.tensor(
        image.featureVector,
        image.shape
      );
      const similarity: number = this.cosineSimilarity(embeddings, imageVector);

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

    console.log(similarProducts);

    // const similarProducts: Product[] = await Promise.all(
    //   similarImages.map((image) => productService.getProduct(image.product))
    // );

    return similarProducts;
  }

  private cosineSimilarity(a: tf.Tensor, b: tf.Tensor): number {
    const dotProduct = tf.sum(tf.mul(a, b)).arraySync() as number;
    const normA = tf.norm(a).arraySync() as number;
    const normB = tf.norm(b).arraySync() as number;
    return dotProduct / (normA * normB);
  }
}

const imageService = new ImageService();

export default imageService;
