import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Order } from '../../model/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fullName', 'phoneNumber', 'address', 'totalPrice'];
  dataSource;
  summary: number;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _orderService: OrderService) { }

  ngOnInit() {
    this.getOrders();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.summary = this.getTotalCost();
  }

  private getOrders() {
    this._orderService.getOrders().subscribe(
      orders => {
        this.dataSource = new MatTableDataSource(orders);
        this.dataSource.sort = this.sort;
        this.summary = this.getTotalCost();
      },
      err => console.error(err)
    );
  }
  private getTotalCost() {
    return this.dataSource.filteredData.reduce((sum, order: Order) => sum + order.totalPrice, 0);
  }

}
