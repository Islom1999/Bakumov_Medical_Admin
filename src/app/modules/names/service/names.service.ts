import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from 'src/app/base/services/base-api.service';
import { Gender } from 'src/enumerations';
import { environment } from 'src/environments/environment';
import { IName } from 'src/interfaces';

@Injectable({
  providedIn: 'root'
})
export class NamesService extends BaseApiService<IName> {

  constructor(http: HttpClient) {
    let params = new HttpParams().set('gender', Gender.man);
    super(http, `${environment.apiUrl}/names`, params);
  }
}
