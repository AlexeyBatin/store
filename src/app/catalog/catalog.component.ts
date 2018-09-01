import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ProductService } from '../services/product.service';
import { ShopCartService } from '../services/shop-cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  products: Product[];
  constructor(private _productService: ProductService, private _cartService: ShopCartService,
    private _router: Router) { }

  ngOnInit() {
    this._productService.getProducts().subscribe(products => this.products = products);
  }

  addToCart(product: Product) {
    this._cartService.setCart(product);
  }

  buyProduct(product: Product) {
    this._cartService.setCart(product);
    this._router.navigate(['cart']);
  }
}
