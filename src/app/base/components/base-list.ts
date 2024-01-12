

import { NzMessageService } from 'ng-zorro-antd/message';
import { Component, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from '../services/base-api.service';

@Component({
  template:''
})
export abstract class BaseList<T> implements OnInit {
  data$: Observable<T[]> = this.baseSrv._data
  constructor(
    protected baseSrv: BaseApiService<T>,
    protected nzMessageService: NzMessageService
  ){}

  ngOnInit() {
    // this.data$ = this.baseSrv._data 
  }

  delete(id: string | undefined): void {
    if(!id) return
    this.baseSrv.delete(id).subscribe((data) => {
        this.nzMessageService.error('delete')
    })
  }
}
