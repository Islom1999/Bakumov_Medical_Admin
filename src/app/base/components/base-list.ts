

import { NzMessageService } from 'ng-zorro-antd/message';
import { Component, Injectable, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { BaseApiService } from '../services/base-api.service';

@Component({
  template:''
})
export abstract class BaseComponentList<T> implements OnInit {
  loading = true
  data$: Observable<T[]> = this.baseSrv._data.pipe()

  constructor(
    protected baseSrv: BaseApiService<T>,
    protected nzMessageService: NzMessageService
  ){}

  ngOnInit() {}

  delete(id: string | undefined): void {
    if(!id) return
    this.baseSrv.delete(id).subscribe((data) => {
        this.nzMessageService.error('delete')
    })
  }
}
