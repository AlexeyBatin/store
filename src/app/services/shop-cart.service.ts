import { Injectable } from '@angular/core';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ShopCartService {

  constructor() { }

  getCart() {
    const cart = {};
    for (const key in sessionStorage) {
      if (sessionStorage.hasOwnProperty(key)) {
        cart[key] = JSON.parse(sessionStorage[key]);
      }
    }
    return cart;
  }

  setCart(product: Product) {
    const cartProduct = {};
    for (const key in product) {
      if (product.hasOwnProperty(key)) {
        cartProduct[key] = product[key];
      }
    }
    sessionStorage.setItem(cartProduct['id'], JSON.stringify(cartProduct));
  }

  deleteCart(id: any) {
    sessionStorage.removeItem(id);
  }

  clearCart() {
    sessionStorage.clear();
  }
}
