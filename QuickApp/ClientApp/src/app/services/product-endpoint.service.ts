import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { EndpointBase } from './endpoint-base.service';
import { ConfigurationService } from './configuration.service';


@Injectable()
export class ProductEndpoint extends EndpointBase {


  get productsUrl() { return this.configurations.baseUrl + '/api/product'; }
  

  constructor(private configurations: ConfigurationService, http: HttpClient, authService: AuthService) {
    super(http, authService);
  }

  getProductsEndpoint<T>(page?: number, pageSize?: number): Observable<T> {
    
    const endpointUrl = pageSize ? `${this.productsUrl}/${page}/${pageSize}` : this.productsUrl;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getProductsEndpoint(page, pageSize));
      }));
  }

}
