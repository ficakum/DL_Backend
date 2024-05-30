import OrderModel, { Order } from "models/order.model";
import Repository from "repositories/mongo.repository";
import { ItemsPage } from "utils/types";

class OrderService {
  repository: Repository<Order>;

  constructor() {
    this.repository = new Repository<Order>(OrderModel);
  }

  async getOrder(id: string, properties: string = ""): Promise<Order> {
    return this.repository.getItem(id, properties);
  }

  async getOrders(query: Map<string, any>): Promise<ItemsPage<Order>> {
    return this.repository.getItems(query);
  }

  async createOrder(order: Partial<Order>): Promise<Order> {
    return this.repository.createItem(order);
  }

  async updateOrder(id: string, order: Partial<Order>): Promise<Order> {
    return this.repository.updateItem(id, order);
  }

  async deleteOrder(id: string): Promise<void> {
    await this.repository.deleteItem(id);
  }
}

const orderService: OrderService = new OrderService();

export default orderService;
