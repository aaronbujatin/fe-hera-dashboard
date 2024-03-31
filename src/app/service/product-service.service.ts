import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private httpClient: HttpClient) { }
  private readonly LOCAL_API = "http://localhost:8080";

  public saveProduct(product : Product){
    return this.httpClient.post(`${this.LOCAL_API}/api/v1/products`, product);
  }

  public getProductById(id:number){
    return this.httpClient.get(`${this.LOCAL_API}/api/v1/products/${id}`)
  }

  public getAllProducts(page: number, size: number) {
    let params = new HttpParams()
    if (page !== undefined) {
      params = params.set('page', page.toString());
    }
    if (size !== undefined) {
      params = params.set('size', size.toString());
    }
    return this.httpClient.get(`${this.LOCAL_API}/api/v1/products`, { params });
  }

}
