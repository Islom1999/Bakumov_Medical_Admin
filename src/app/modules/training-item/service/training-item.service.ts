import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from 'src/app/base/services/base-api.service';
import { environment } from 'src/environments/environment';
import { ITrainingItem } from 'src/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TrainingItemService extends BaseApiService<ITrainingItem> {

  constructor(http:HttpClient) {
    super(http, `${environment.apiUrl}/training-step`);
  }
}
