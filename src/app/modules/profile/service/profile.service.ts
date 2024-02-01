import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from 'src/app/base/services/base-api.service';
import { environment } from 'src/environments/environment';
import { IAdmin } from 'src/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends BaseApiService<IAdmin> {

  constructor(private _http: HttpClient) {
    super(_http, `${environment.apiUrl}/profile`);
  }
  
}
