import { Injectable } from '@angular/core';
import { Observable, Subject, forkJoin } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';

import { ProductEndpoint } from './product-endpoint.service';
import { AuthService } from './auth.service';
import { Product } from '../models/product.model';


@Injectable()
export class ProductService {


  constructor(private authService: AuthService, private productEndpoint: ProductEndpoint) { }

  getProducts(page?: number, pageSize?: number) {
    return this.productEndpoint.getProductsEndpoint<Product[]>(page, pageSize);
  }
}
