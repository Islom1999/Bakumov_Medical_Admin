import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from 'src/app/base/services/base-api.service';
import { environment } from 'src/environments/environment';
import { ITools } from 'src/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ToolsService extends BaseApiService<ITools> {

  constructor(http: HttpClient) {
    super(http, `${environment.apiUrl}/tools`);
  }
}
