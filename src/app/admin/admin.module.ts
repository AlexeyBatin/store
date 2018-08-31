import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ProductsComponent } from './products/products.component';
import { MaterialModule } from '../material.module';
import { HomeComponent } from './home/home.component';
import { CreateEditProductComponent } from './create-edit-product/create-edit-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AvaiblePipe } from './products/avaible.pipe';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [ProductsComponent, HomeComponent, CreateEditProductComponent, AvaiblePipe]
})
export class AdminModule { }
