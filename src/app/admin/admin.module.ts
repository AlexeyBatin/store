import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ProductsComponent } from './products/products.component';
import { MaterialModule } from '../material.module';
import { HomeComponent } from './home/home.component';
import { CreateEditProductComponent } from './create-edit-product/create-edit-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AvailablePipe } from './products/available.pipe';
import { OrdersComponent } from './orders/orders.component';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [ProductsComponent, HomeComponent, CreateEditProductComponent, AvailablePipe, OrdersComponent]
})
export class AdminModule { }
