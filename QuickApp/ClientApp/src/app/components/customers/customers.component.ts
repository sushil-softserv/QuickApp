// ======================================
// Author: Ebenezer Monney
// Copyright (c) 2023 www.ebenmonney.com
// 
// ==> Gun4Hire: contact@ebenmonney.com
// ======================================

import { Component, Input } from '@angular/core';
import { fadeInOut } from '../../services/animations';
import { Utilities } from '../../services/utilities';

import { Customer } from '../../models/customer.model';
import { Page } from '../../models/page';
import { AlertService, MessageSeverity, DialogType } from 'src/app/services/alert.service';
import { AppTranslationService } from 'src/app/services/app-translation.service';
import { LocalStoreManager } from 'src/app/services/local-store-manager.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
  animations: [fadeInOut]
})
export class CustomersComponent {
  page = new Page();
  columns: any[] = [];
  rows: Customer[] = [];
  rowsCache: Customer[] = [];
  editing = {};
  customerEdit: any = {};
  isDataLoaded = false;
  loadingIndicator: boolean;
  formResetToggle = true;
  _currentUserId: string;
  public customers: Customer = new Customer();

  constructor(private alertService: AlertService, private translationService: AppTranslationService,
    private localStorage: LocalStoreManager, private customerService: CustomerService){
      this.page.pageNumber = 0;
      this.page.pageSize = 100;
    }

    @Input()
  verticalScrollbar = false;

  ngOnInit() {
    this.loadingIndicator = true;
    const gT = (key: string) => this.translationService.getTranslation(key);

    this.columns = [
      { prop: 'id', name: '#', width: 60, canAutoResize: false },
      { prop: 'name', name: gT('customers.management.CustomerName'), width: 150 },
      { prop: 'email', name: gT('customers.management.CustomerEmail'), width: 150, sortable: false },
      { prop: 'phoneNumber', name: gT('customers.management.CustomerPhone'), width: 30, sortable: false },
      { prop: 'address', name: gT('customers.management.CustomerAddress'), width: 30, sortable: false },
      { prop: 'city', name: gT('customers.management.CustomerCity'), width: 30, sortable: false },
      { prop: 'gender', name: gT('customers.management.CustomerGender'), width: 40 }
    ]

    //this.loadProductsData({ offset: 1 });
    this.setPage({ offset: 0 });
  }

  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    this.customerService.getCustomers(this.page.pageNumber, this.page.pageSize).subscribe({
      next: customers => this.onDataLoadSuccessful(customers),
      error: error => this.onDataLoadFailed(error)
    });
  }

  onDataLoadSuccessful(customers: Customer[]) {
   
    this.alertService.stopLoadingMessage();
    this.loadingIndicator = false;

    // this.customers.((customer, index) => {
    //   (customer as any).index = index + 1;
    // });

    this.rowsCache = [...customers];
    this.rows = customers;
    this.page.totalRecords = 847;
    this.page.totalPages = 847 / this.page.pageSize;
  }


  onDataLoadFailed(error: any) {
    this.alertService.stopLoadingMessage();
    this.loadingIndicator = false;

    this.alertService.showStickyMessage('Load Error', `Unable to retrieve products from the server.\r\nErrors: "${Utilities.getHttpResponseMessages(error)}"`,
      MessageSeverity.error, error);
  }

  onSearchChanged(value: string) {
    this.rows = this.rowsCache.filter(r =>
      Utilities.searchArray(value, false, r.name, r.address, r.email, r.phone));
  }


  showErrorAlert(caption: string, message: string) {
    this.alertService.showMessage(caption, message, MessageSeverity.error);
  }
}
