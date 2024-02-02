

import { NzMessageService } from 'ng-zorro-antd/message';
import { Component, Injectable, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { BaseApiService } from '../services/base-api.service';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { Breadcrumb } from 'src/types/breadcrump';
import { NgxPermissionsService } from 'ngx-permissions';
import { PermissionService } from 'src/app/shared/services/permission.service';

@Component({
  template:''
})
export abstract class BaseComponentList<T> implements OnInit {
  loading = false
  data$: Observable<T[]> = this.baseSrv._data.pipe()

  abstract breadcrumb: Breadcrumb

  constructor(
    protected baseSrv: BaseApiService<T>,
    protected nzMessageService: NzMessageService,
    protected breadcrumbService: BreadcrumbsService,
    protected permission: PermissionService,
    protected permissionSrv: NgxPermissionsService,
  ){}

  ngOnInit() {
    this.breadcrumbService.setBreadcrumbs([
      { 
        header:this.breadcrumb.header,
        label:this.breadcrumb.label, 
        url: this.breadcrumb.url
      },
    ]);
    this.permission.getPermisssion().subscribe(permission => {
      this.permissionSrv.loadPermissions(permission);
    })
  }

  delete(id: string | undefined): void {
    if(!id) return
    this.baseSrv.delete(id).subscribe((data) => {
        this.nzMessageService.error('delete')
    })
  }
}
