import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from 'src/app/base/services/base-api.service';
import { environment } from 'src/environments/environment';
import { IMessage } from 'src/interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService extends BaseApiService<IMessage> {
  constructor(
    http: HttpClient
  ) {
    super(http, `${environment.apiUrl}/message`)
  }  
}
