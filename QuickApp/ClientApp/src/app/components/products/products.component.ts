// ======================================
// Author: Ebenezer Monney
// Copyright (c) 2023 www.ebenmonney.com
// 
// ==> Gun4Hire: contact@ebenmonney.com
// ======================================

import { Component, OnInit, OnDestroy, Input, TemplateRef, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { AuthService } from '../../services/auth.service';
import { AlertService, MessageSeverity, DialogType } from '../../services/alert.service';
import { AppTranslationService } from '../../services/app-translation.service';
import { LocalStoreManager } from '../../services/local-store-manager.service';
import { Utilities } from '../../services/utilities';
import { fadeInOut } from '../../services/animations';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { Page } from '../../models/page';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [fadeInOut]
})
export class ProductsComponent {
  page = new Page();
  columns: any[] = [];
  rows: Product[] = [];
  rowsCache: Product[] = [];
  editing = {};
  productEdit: any = {};
  isDataLoaded = false;
  loadingIndicator: boolean;
  formResetToggle = true;
  _currentUserId: string;
  public products: Product = new Product();

  constructor(private alertService: AlertService, private translationService: AppTranslationService,
    private localStorage: LocalStoreManager, private authService: AuthService, private productService: ProductService) {
    this.page.pageNumber = 0;
    this.page.pageSize = 10;
  }

  @Input()
  verticalScrollbar = false;

  ngOnInit() {
    this.loadingIndicator = true;
    const gT = (key: string) => this.translationService.getTranslation(key);

    this.columns = [
      { prop: 'id', name: '#', width: 60, canAutoResize: false },
      { prop: 'name', name: gT('products.management.ProductName'), width: 150 },
      { prop: 'description', name: gT('products.management.ProductDescription'), width: 350, sortable: false },
      { prop: 'buyingPrice', name: gT('products.management.BuyingPrice'), width: 30, sortable: false },
      { prop: 'sellingPrice', name: gT('products.management.SellingPrice'), width: 30, sortable: false },
      { prop: 'unitsInStock', name: gT('products.management.UnitsInStock'), width: 30, sortable: false },
      //{ prop: 'phoneNumber', name: gT('products.management.PhoneNumber'), width: 100 }
    ]

    //this.loadProductsData({ offset: 1 });
    this.setPage({ offset: 0 });
  }

  setPage(pageInfo) {
    
    this.page.pageNumber = pageInfo.offset;
    this.productService.getProducts(this.page.pageNumber, this.page.pageSize).subscribe({
      next: products => this.onDataLoadSuccessful(products),
      error: error => this.onDataLoadFailed(error)
    });
  }

  private loadProductsData(pageInfo) {
    this.alertService.startLoadingMessage();
    this.page.pageNumber = pageInfo.offset;
    this.productService.getProducts(this.page.pageNumber, this.page.pageSize).subscribe({
      next: products => this.onDataLoadSuccessful(products),
      error: error => this.onDataLoadFailed(error)
    });
  }

  onDataLoadSuccessful(products: Product[]) {
   
    this.alertService.stopLoadingMessage();
    this.loadingIndicator = false;

    products.forEach((product, index) => {
      (product as any).index = index + 1;
    });

    this.rowsCache = [...products];
    this.rows = products;
    this.page.totalRecords = 297;
    this.page.totalPages = 297 / this.page.pageSize;
  }


  onDataLoadFailed(error: any) {
    this.alertService.stopLoadingMessage();
    this.loadingIndicator = false;

    this.alertService.showStickyMessage('Load Error', `Unable to retrieve products from the server.\r\nErrors: "${Utilities.getHttpResponseMessages(error)}"`,
      MessageSeverity.error, error);
  }

  onSearchChanged(value: string) {
    this.rows = this.rowsCache.filter(r =>
      Utilities.searchArray(value, false, r.name, r.description));
  }


  showErrorAlert(caption: string, message: string) {
    this.alertService.showMessage(caption, message, MessageSeverity.error);
  }


  addProduct() {
    this.formResetToggle = false;

    setTimeout(() => {
      this.formResetToggle = true;

      this.productEdit = {};
      //this.editorModal.show();
    });
  } 
}
