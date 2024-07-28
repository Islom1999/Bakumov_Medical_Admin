import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from 'src/app/base/services/base-api.service';
import { environment } from 'src/environments/environment';
import { IOrder, IOrderV2 } from 'src/interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseApiService<IOrder> {

  constructor(private _http: HttpClient) {
    super(_http, `${environment.apiUrl}/order-premium/order`);
  }
}


@Injectable({
  providedIn: 'root'
})
export class OrderServiceV2 extends BaseApiService<IOrderV2> {
  constructor(private _http: HttpClient) {
    super(_http, `${environment.apiUrl}/order/v2`)
  }
}
