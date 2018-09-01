import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../model/product';
import { ProductService } from '../../services/product.service';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'available', 'image', 'action'];
  dataSource;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private _productService: ProductService, private _router: Router) {
  }

  ngOnInit() {
    this.getProducts();
  }

  private getProducts(): void {
    this._productService.getProducts()
      .subscribe(products => {
        this.dataSource = new MatTableDataSource(products);
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteProduct(product: Product) {
    this._productService.deleteProduct(product).subscribe();
    this.getProducts();
  }

  createProduct() {
    this._router.navigate(['admin', 'products', 'create']);
  }

  editProduct(selected: Product): void {
    this._router.navigate(['admin', 'products', 'edit', selected.id]);
  }

}
