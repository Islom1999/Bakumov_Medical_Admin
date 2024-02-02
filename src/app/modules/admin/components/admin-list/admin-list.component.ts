import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BaseComponentList } from 'src/app/base/components/base-list';
import { IAdmin } from 'src/interfaces';
import { AdminService } from '../../service/admin.service';
import { Observable, of, switchMap } from 'rxjs';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { Breadcrumb } from 'src/types/breadcrump';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { AdminDetailComponent } from '../admin-detail/admin-detail.component';
import { AdminInfoComponent } from '../admin-info/admin-info.component';
import { PermissionService } from 'src/app/shared/services/permission.service';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent extends BaseComponentList<IAdmin> {
  admins$: Observable<IAdmin[]> = of([]);
  
  // Serch variables
  searchValue = '';
  visible = false;

  override breadcrumb: Breadcrumb = {
    header: "Adminlar", 
    label: "Adminlar ro'yhati", 
    url: '/admin'
  };

  constructor(
    _adminSrv: AdminService,
    _messageSrv: NzMessageService,
    _breadcrumbService: BreadcrumbsService,
    private drawerService: NzDrawerService,
    private permissions: PermissionService,
    private permissionService: NgxPermissionsService,
  ){
    super(_adminSrv, _messageSrv, _breadcrumbService, permissions, permissionService)
  }

  

  override ngOnInit(): void {
    super.ngOnInit()
    this.admins$ = this.data$;
  }

  // Search reset function
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  // Search function
  search(): void {
    this.visible = false;
    this.admins$ = this.admins$.pipe(
      switchMap((item) =>
        of(
          item.filter((admin) =>
            admin.name
              .toLocaleLowerCase()
              .includes(this.searchValue.toLocaleLowerCase())
          )
        )
      )
    );
  }

  open(id:string): void {
    this.drawerService.create<AdminInfoComponent, { id: string }, string>({
      nzTitle: 'Adminlar ma\'lumotlari',
      nzContent: AdminInfoComponent,
      nzSize: 'large',
      nzContentParams: {
        id: id
      }
    });
  }

}
