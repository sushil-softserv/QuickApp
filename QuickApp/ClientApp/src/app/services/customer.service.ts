import { Injectable } from '@angular/core';
import { Observable, Subject, forkJoin } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';

import { CustomerEndpoint } from './customer-endpoint.service';
import { Customer } from '../models/customer.model';

@Injectable()
export class CustomerService {

  constructor(private customerEndpoint: CustomerEndpoint) { }

  getCustomers(page?: number, pageSize?: number){
    return this.customerEndpoint.getCustomersEndpoint<Customer[]>(page, pageSize);
  }
}
