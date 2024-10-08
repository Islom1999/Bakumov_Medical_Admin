import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from 'src/app/base/services/base-api.service';
import { environment } from 'src/environments/environment';
import { ISettings } from 'src/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SettingsService extends BaseApiService<ISettings> {
  constructor(private _http: HttpClient){
    super(_http, `${environment.apiUrl}/settings`);
  }

  getSettings(){
    return this._http.get<ISettings>(`${environment.apiUrl}/settings`)
  }

  setSettings(settings: ISettings){
    return this._http.post<ISettings>(`${environment.apiUrl}/settings`, settings)
  }
}
