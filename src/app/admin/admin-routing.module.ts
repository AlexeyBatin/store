import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { CreateEditProductComponent } from './create-edit-product/create-edit-product.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {
    path: 'admin',
    component: HomeComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'products'
      },
      {
        path: 'products',
        component: ProductsComponent
      },
      {
        path: 'products/edit/:id',
        component: CreateEditProductComponent
      },
      {
        path: 'products/create',
        component: CreateEditProductComponent
      },
      {
        path: 'orders',
        component: OrdersComponent
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
