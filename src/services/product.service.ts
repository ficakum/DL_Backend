import ProductModel, { Product } from "../models/product.model";
import Repository from "../repositories/mongo.repository";
import { ItemsPage } from "../utils/types";

class ProductService {
  repository: Repository<Product>;

  constructor() {
    this.repository = new Repository<Product>(ProductModel);
  }

  async getProduct(id: string, properties: string = ""): Promise<Product> {
    return this.repository.getItem(id, properties);
  }

  async getProducts(query: Map<string, any>): Promise<ItemsPage<Product>> {
    return this.repository.getItems(query);
  }

  async getProductsByIds(
    ids: string[],
    query: Map<string, any>
  ): Promise<ItemsPage<Product>> {
    query.set("searchQuery", {
      ...query.get("searchQuery"),
      _id: { $in: ids },
    });

    return this.repository.getItems(query);
  }

  async createProduct(product: Partial<Product>): Promise<Product> {
    return this.repository.createItem(product);
  }

  async updateProduct(id: string, product: Partial<Product>): Promise<Product> {
    return this.repository.updateItem(id, product);
  }

  async deleteProduct(id: string): Promise<void> {
    await this.repository.deleteItem(id);
  }
}

const productService: ProductService = new ProductService();

export default productService;
