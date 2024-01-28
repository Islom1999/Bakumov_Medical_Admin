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
  visible = false;

  override breadcrumb: Breadcrumb = {
    header: "Foydalanuvchilar", 
    label: "Foydalanuvchilar ro'yhati", 
    url: '/client'
  };

  constructor(
    private _userSrv: UserService,
    private _messageSrv: NzMessageService,
    private _breadcrumbSrv: BreadcrumbsService
  ) {
    super(_userSrv, _messageSrv, _breadcrumbSrv);
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

  // Search function
  search(): void {
    this.visible = false;
    this.user$ = this.user$.pipe(
      switchMap((item) =>
        of(
          item.filter((elem) =>
            elem.fullname
              .toLocaleLowerCase()
              .includes(this.searchValue.toLocaleLowerCase())
          )
        )
      )
    );
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
