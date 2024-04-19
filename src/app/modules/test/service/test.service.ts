import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from 'src/app/base/services/base-api.service';
import { environment } from 'src/environments/environment';
import { ITest, ITestAnswer } from 'src/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TestService extends BaseApiService<ITest> {

  constructor(private _http: HttpClient){
    super(_http, `${environment.apiUrl}/test`);
  }
}

@Injectable({
  providedIn: 'root'
})
export class TestAnswerService extends BaseApiService<ITestAnswer> {

  constructor(private _http: HttpClient){
    super(_http, `${environment.apiUrl}/test-answer`);
  }
}
