import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from 'src/app/base/services/base-api.service';
import { environment } from 'src/environments/environment';
import { IUser } from 'src/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseApiService<IUser> {

  constructor(http: HttpClient) {
    super(http, `${environment.apiUrl}/user`);
  }
}
