import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from 'src/app/base/services/base-api.service';
import { environment } from 'src/environments/environment';
import { IPremium } from 'src/interfaces/premium';

@Injectable({
  providedIn: 'root'
})
export class PremiumService extends BaseApiService<IPremium> {

  constructor(http: HttpClient) {
    super(http, `${environment.apiUrl}/premium`);
  }
}