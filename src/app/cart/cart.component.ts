import { Component, OnInit } from '@angular/core';
import { ShopCartService } from '../services/shop-cart.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Order } from '../model/order';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';
import { Product } from '../model/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: {};
  badge: number;
  totalPrice: number;
  emptyCart: boolean;
  orderForm: FormGroup;
  order: Order;
  constructor(private _cartService: ShopCartService, private _fb: FormBuilder,
    private _orderService: OrderService, private _router: Router) {
    this.emptyCart = false;
  }

  ngOnInit() {
    this.buildCart();
    this.buildForm();
    this.initForm();
  }

  deleteItem(id) {
    this._cartService.deleteCart(id);
    this.buildCart();
  }

  private buildCart() {
    this.cart = this._cartService.getCart();
    this.badge = sessionStorage.length;
    this.totalPrice = 0;
    if (Object.keys(this.cart).length !== 0) {
      for (const key in this.cart) {
        if (this.cart.hasOwnProperty(key)) {
          const element = this.cart[key];
          this.totalPrice += element['price'];
        }
      }
    } else {
      this.emptyCart = true;
    }
  }

  private buildForm() {
    const phoneRegExp = /^(\+38\s+)?\d{3}(\s*|\-)\d{3}(\s*|\-)\d{4}$/;
    const fullNameRegExp = /^([A-Z]+[a-zA-Z]*)(\s|\-)?([A-Z]+[a-zA-Z]*)?(\s|\-)?([A-Z]+[a-zA-Z]*)?$/;
    this.orderForm = this._fb.group({
      fullName: ['', [Validators.required, Validators.pattern(fullNameRegExp)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(phoneRegExp)]],
      address: ['', Validators.required]
    });
  }

  private initForm() {
    this.order = new Order(null, null, null, null, []);
    this.orderForm.patchValue(this.order);
  }

  public onSubmit(orderForm: FormGroup) {
    this.order.fullName = orderForm.value.fullName;
    this.order.phoneNumber = orderForm.value.phoneNumber;
    this.order.address = orderForm.value.address;
    this.order.products = this.getProductsFromCart(this.cart);
    this.order.totalPrice = this.getTotalPrice(this.order.products);
    this._orderService.addOrder(this.order)
      .subscribe(_ => {
        this._router.navigate(['catalog']);
        this._cartService.clearCart();
      },
        err => console.error(err));
  }

  private getTotalPrice(products: Product[]) {
    return products.reduce((sum, product: Product) => sum + product.price, 0);
  }

  private getProductsFromCart(cart): Product[] {
    const products: Product[] = [];
    for (const key in cart) {
      if (cart.hasOwnProperty(key)) {
        const element = cart[key];
        products.push(element);
      }
    }
    return products;
  }
}
