import { CartItems } from './CartItems';

export class Order {
  id!: number;
  item!: CartItems[];
  totalPrice!: number;
  name!: string;
  address!: string;
  paymentId!: string;
  createdAt!: string;
  status!: string;
}
