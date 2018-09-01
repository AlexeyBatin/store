import { Product } from './product';

export class Order {
  id: number;
  fullName: string;
  phoneNumber: string;
  address: string;
  products: Product[];
  totalPrice: number;
  constructor(id, fullName, phoneNumber, address, products) {
    this.id = id;
    this.fullName = fullName;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.products = products;
    this.totalPrice = products.reduce(function (sum, current: Product) {
      return sum + current.price;
    }, 0);
  }
}
