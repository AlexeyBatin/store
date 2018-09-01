import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Order } from '../model/order';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersUrl = 'api/orders';

  constructor(private _http: HttpClient) { }

  /** GET order from the server */
  getOrders(): Observable<Order[]> {
    return this._http.get<Order[]>(this.ordersUrl)
      .pipe(
        tap(orders => console.log('fetched orders', orders)),
        catchError(this.handleError('getOrders', []))
      );
  }

  /** GET order by id. Will 404 if id not found */
  getOrder(id: number): Observable<Order> {
    const url = `${this.ordersUrl}/${id}`;
    return this._http.get<Order>(url).pipe(
      tap(_ => console.log(`fetched order id=${id}`)),
      catchError(this.handleError<Order>(`getOrder id=${id}`))
    );
  }

  //////// Save methods //////////

  /** POST: add a new order to the server */
  addOrder(order: Order): Observable<Order> {
    return this._http.post<Order>(this.ordersUrl, order, httpOptions).pipe(
      tap((ord: Order) => console.log(`added order w/ id=${ord.id}`)),
      catchError(this.handleError<Order>('addOrder'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
