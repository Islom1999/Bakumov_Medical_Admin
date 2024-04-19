import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from 'src/app/base/services/base-api.service';
import { environment } from 'src/environments/environment';
import { ITale } from 'src/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TaleService extends BaseApiService<ITale> {

  constructor(private _http: HttpClient){
    super(_http, `${environment.apiUrl}/tale`);
  }
}
