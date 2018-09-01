import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Product } from '../model/product';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'api/products';

  constructor(private _http: HttpClient) { }

  /** GET product from the server */
  getProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(this.productsUrl)
      .pipe(
        tap(products => console.log('fetched products', products)),
        catchError(this.handleError('getProducts', []))
      );
  }

  /** GET product by id. Will 404 if id not found */
  getProduct(id: number): Observable<Product> {
    const url = `${this.productsUrl}/${id}`;
    return this._http.get<Product>(url).pipe(
      tap(_ => console.log(`fetched product id=${id}`)),
      catchError(this.handleError<Product>(`getProduct id=${id}`))
    );
  }

  //////// Save methods //////////

  /** POST: add a new product to the server */
  addProduct(product: Product): Observable<Product> {
    return this._http.post<Product>(this.productsUrl, product, httpOptions).pipe(
      tap((prod: Product) => console.log(`added product w/ id=${prod.id}`)),
      catchError(this.handleError<Product>('addProduct'))
    );
  }

  /** DELETE: delete the product from the server */
  deleteProduct(product: Product | number): Observable<Product> {
    const id = typeof product === 'number' ? product : product.id;
    const url = `${this.productsUrl}/${id}`;

    return this._http.delete<Product>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<Product>('deleteProduct'))
    );
  }

  /** PUT: update the product on the server */
  updateProduct(product: Product): Observable<any> {
    return this._http.put(this.productsUrl, product, httpOptions).pipe(
      tap(_ => console.log(`updated product id=${product.id}`)),
      catchError(this.handleError<any>('updateProduct'))
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
