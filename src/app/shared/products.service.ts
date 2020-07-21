import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';





@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) {}


  getAllProducts(): Observable<any> {
    return this.http.get('/api/products/all')
      .pipe(
        map(result => {
          return result;
        })
      );
  }

  getAllDiscountedProducts(): Observable<any> {
    return this.http.get('/api/products/Alldiscounted')
      .pipe(
        map(result => {
          return result;
        })
      );
  }


  getAllNewProducts(): Observable<any> {
    return this.http.get('/api/products/allNew')
      .pipe(
        map(result => {
          return result;
        })
      );
  }

  getProductById(id): Observable<any> {
    return this.http.get(`/api/products/${id}`)
      .pipe(
        map(result => {
          return result;
        })
      );
  }
}
