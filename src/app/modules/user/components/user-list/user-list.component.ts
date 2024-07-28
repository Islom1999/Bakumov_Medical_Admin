import { Component, OnInit } from '@angular/core';
import { Observable, of, switchMap, tap } from 'rxjs';
import { BaseComponentList } from 'src/app/base/components/base-list';
import { IUser } from 'src/interfaces';
import { UserService } from '../../service/user.service';
import { AdminService } from 'src/app/modules/admin/service/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpParams } from '@angular/common/http';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { Breadcrumb } from 'src/types/breadcrump';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { UserUpdateComponent } from '../user-update/user-update.component';
import { PermissionService } from 'src/app/shared/services/permission.service';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent
  extends BaseComponentList<IUser>
  implements OnInit
{
  user$: Observable<IUser[]> = of([]);

  // Serch variables
  searchValue = '';
  searchValuePhone = ''
  searchValueEmail = ''
  visible = false;
  visiblePhone = false;
  visibleEmail = false;

  override breadcrumb: Breadcrumb = {
    header: "Foydalanuvchilar", 
    label: "Foydalanuvchilar ro'yhati", 
    url: '/client'
  };

  constructor(
    private _userSrv: UserService,
    private _messageSrv: NzMessageService,
    private _breadcrumbSrv: BreadcrumbsService,
    private drawerService: NzDrawerService,
    private permissions: PermissionService,
    private permissionService: NgxPermissionsService, 
  ) {
    super(_userSrv, _messageSrv, _breadcrumbSrv, permissions, permissionService);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.user$ = this.data$.pipe(
      tap(() => {
        this.loading = false;
      })
    );
  }

  // Search reset function
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  resetPhone(): void {
    this.searchValuePhone = '';
    this.searchPhone();
  }

  resetEmail(): void {
    this.searchValueEmail = '';
    this.searchEmail();
  }

  // Search function
  search(): void {
    this.visible = false;
    this.user$ = this.user$.pipe(
      switchMap((item) =>
        of(
          item.filter((elem) =>
            elem.fullname
              .toLowerCase()
              .includes(this.searchValue.toLowerCase())
          )
        )
      )
    );
  }

  searchPhone(): void {
    this.visiblePhone = false;
    this.user$ = this.user$.pipe(
      switchMap((item) =>
        of(
          item.filter((user) =>
            user?.phone ?
            user?.phone
              .toString()
              .includes(this.searchValuePhone.toString())
            :false
          )
        )
      )
    );
  }

  searchEmail(): void {
    this.visibleEmail = false;
    this.user$ = this.user$.pipe(
      switchMap((item) =>
        of(
          item.filter((elem) =>
            elem.email ?
            elem.email
              .toLowerCase()
              .includes(this.searchValueEmail.toLowerCase())
            : false
          )
        )
      )
    );
  }


  open(id:string): void {
    this.drawerService.create<UserDetailComponent, { id: string }, string>({
      nzTitle: 'Foydalanuvchi ma\'lumotlari',
      nzContent: UserDetailComponent,
      nzSize: 'large',
      nzContentParams: {
        id: id
      }
    });
  }

  openUpdate(id:string): void {
    this.drawerService.create<UserUpdateComponent, { id: string }, string>({
      nzTitle: "Foydalanuvchi ma'lumotlari o'zgartirish",
      nzContent: UserUpdateComponent,
      nzSize: 'default',
      nzContentParams: {
        id: id
      }
    });
  }

  // filterParent(selectedId: string) {
  //   if (selectedId) {
  //     let params = new HttpParams().set('parent_id', selectedId.toString());
  //     this.user$ = this._userSrv.getAll(params);
  //   } else {
  //     this.user$ = this._userSrv.getAll();
  //   }
  // }
}
