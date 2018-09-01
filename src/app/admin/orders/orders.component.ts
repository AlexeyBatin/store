import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { MatTableDataSource} from '@angular/material';
import { Order } from '../../model/order';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class OrdersComponent implements OnInit {
  columnsToDisplay: string[] = ['id', 'fullName', 'phoneNumber', 'address', 'totalPrice'];
  dataSource;
  expandedElement: Order;
  summary: number;

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
        this.summary = this.getTotalCost();
      },
      err => console.error(err)
    );
  }
  private getTotalCost() {
    return this.dataSource.filteredData.reduce((sum, order: Order) => sum + order.totalPrice, 0);
  }

}
