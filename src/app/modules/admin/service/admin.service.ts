import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/base/services/base-api.service';
import { environment } from 'src/environments/environment';
import { IAdmin } from 'src/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AdminService extends BaseApiService <IAdmin> {
  constructor(
    http: HttpClient
  ) {
    super(http, `${environment.apiUrl}/admin`)
  }

  getByme(){
    return this.http.get<IAdmin>(`${environment.apiUrl}/admin/me`)
  }
}
