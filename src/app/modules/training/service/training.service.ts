import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from 'src/app/base/services/base-api.service';
import { environment } from 'src/environments/environment';
import { ITraining } from 'src/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TrainingService extends BaseApiService<ITraining> {

  constructor(http:HttpClient) {
    super(http, `${environment.apiUrl}/training`);
  }
}
