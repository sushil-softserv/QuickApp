import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { EndpointBase } from './endpoint-base.service';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class CustomerEndpoint extends EndpointBase {


  get customersUrl() { return this.configurations.baseUrl + '/api/customer'; }
  get createCustomerUrl() { return this.configurations.baseUrl + '/api/customer'; }
  get updateCustomerUrl() { return this.configurations.baseUrl + '/api/customer'; }
  get deleteCustomerUrl() { return this.configurations.baseUrl + '/api/customer'; }

  constructor(private configurations: ConfigurationService, http: HttpClient, authService: AuthService) {
    super(http, authService);
  }

  getCustomersEndpoint<T>(page?: number, pageSize?: number): Observable<T> {
    const endpointUrl = pageSize ? `${this.customersUrl}/${page}/${pageSize}` : this.customersUrl;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getCustomersEndpoint(page, pageSize));
      }));
  }


}
