import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from 'src/app/base/services/base-api.service';
import { environment } from 'src/environments/environment';
import { IVaccine } from 'src/interfaces';

@Injectable({
  providedIn: 'root'
})
export class VaccineService extends BaseApiService<IVaccine> {

  constructor(private _http: HttpClient){
    super(_http, `${environment.apiUrl}/vaccine`);
  }
}
