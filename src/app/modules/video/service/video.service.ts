import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from 'src/app/base/services/base-api.service';
import { environment } from 'src/environments/environment';
import { IVideo } from 'src/interfaces/video';

@Injectable({
  providedIn: 'root'
})
export class VideoService extends BaseApiService<IVideo> {
  constructor(
    http: HttpClient  
  ) { 
    super(http, `${environment.apiUrl}/video`);
  }
}
