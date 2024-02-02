import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../service/role.service';
import { IRole } from 'src/interfaces';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, filter, of, switchMap } from 'rxjs';
import { BaseComponentList } from 'src/app/base/components/base-list';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { Breadcrumb } from 'src/types/breadcrump';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { RoleInfoComponent } from '../role-info/role-info.component';
import { PermissionService } from 'src/app/shared/services/permission.service';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss'],
})
export class RoleListComponent extends BaseComponentList<IRole> {
  roles$: Observable<IRole[]> = of([]);
  
  // Serch variables
  searchValue = '';
  visible = false;

  override breadcrumb: Breadcrumb = {
    header: "Rollar", 
    label: "Rollar ro'yhati", 
    url: '/role'
  };

  constructor(
    _roleSrv: RoleService, 
    _messageSrv: NzMessageService, 
    _breadcrumbSrv: BreadcrumbsService,
    private drawerService: NzDrawerService,
    private permissions: PermissionService,
    private permissionService: NgxPermissionsService, 
  ) {
    super(_roleSrv, _messageSrv, _breadcrumbSrv, permissions, permissionService);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.roles$ = this.data$;
  }

  // Search reset function
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  // Search function
  search(): void {
    this.visible = false;
    this.roles$ = this.roles$.pipe(
      switchMap((item) =>
        of(
          item.filter((role) =>
            role.title
              .toLocaleLowerCase()
              .includes(this.searchValue.toLocaleLowerCase())
          )
        )
      )
    );
  }

  open(id:string): void {
    this.drawerService.create<RoleInfoComponent, { id: string }, string>({
      nzTitle: 'Rollar ma\'lumotlari',
      nzContent: RoleInfoComponent,
      nzSize: 'large',
      nzContentParams: {
        id: id
      }
    });
  }

}
