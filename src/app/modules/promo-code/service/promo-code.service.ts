import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from 'src/app/base/services/base-api.service';
import { environment } from 'src/environments/environment';
import { IPromoCode } from 'src/interfaces/promo-code';

@Injectable({
  providedIn: 'root'
})
export class PromoCodeService extends BaseApiService<IPromoCode> {

  constructor(http: HttpClient) {
    super(http, `${environment.apiUrl}/promo`);
  }

  getAllMe(){
      return this.http.get<IPromoCode[]>(`${this.apiUrl}/byme`);
  }
}
