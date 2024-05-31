import { OrderStatus } from "../models/order.model";
import orderService from "./order.service";

class PaymentService {
  async payOrder(id: string) {
    return orderService.updateOrder(id, { status: OrderStatus.PAID });
  }
}

const paymentService: PaymentService = new PaymentService();

export default paymentService;
