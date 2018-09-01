import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router, Params } from '@angular/router';


@Component({
  selector: 'app-create-edit-product',
  templateUrl: './create-edit-product.component.html',
  styleUrls: ['./create-edit-product.component.css']
})
export class CreateEditProductComponent implements OnInit {
  currentProduct: Product;
  productForm: FormGroup;
  constructor(private _productService: ProductService, private _activatedRoute: ActivatedRoute,
    private _fb: FormBuilder, private _router: Router) { }

  ngOnInit() {
    this.buildForm();
    this.getProductFromRoute();
  }

  public onSubmit(productForm: FormGroup) {
    this.currentProduct.name = productForm.value.name;
    this.currentProduct.description = productForm.value.description;
    this.currentProduct.price = productForm.value.price;
    this.currentProduct.available = productForm.value.available;
    this.currentProduct.image = productForm.value.image;
    if (this.currentProduct.id) {
      this._productService.updateProduct(this.currentProduct)
        .subscribe(_ => this._router.navigate(['admin', 'products']),
          err => console.error(err));
    } else {
      this._productService.addProduct(this.currentProduct)
        .subscribe(_ => this._router.navigate(['admin', 'products']),
          err => console.error(err));
    }
  }
  private getProductFromRoute() {
    this._activatedRoute.params.forEach((params: Params) => {
      const id = params['id'];
      if (id) {
        this._productService.getProduct(id).subscribe(
          product => {
            this.currentProduct = product;
            this.productForm.patchValue(this.currentProduct);
          },
          err => console.log(err));
      } else {
        this.currentProduct = new Product(null, null, null, null, null, null);
        this.productForm.patchValue(this.currentProduct);
      }
    });
  }

  private buildForm() {
    this.productForm = this._fb.group({
      name: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(200)]],
      price: ['', Validators.required],
      available: [''],
      image: ['']
    });
  }

}
