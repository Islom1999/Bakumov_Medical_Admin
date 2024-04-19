import { Component } from '@angular/core';
import { BaseComponentList } from 'src/app/base/components/base-list';
import { ITale } from 'src/interfaces';
import { TaleService } from '../../service/tale.service';
import { HttpParams } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgxPermissionsService } from 'ngx-permissions';
import { Observable, of, tap, switchMap } from 'rxjs';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { PermissionService } from 'src/app/shared/services/permission.service';
import { Gender } from 'src/enumerations';
import { Breadcrumb } from 'src/types/breadcrump';

@Component({
  selector: 'app-tale-list',
  templateUrl: './tale-list.component.html',
  styleUrls: ['./tale-list.component.scss']
})
export class TaleListComponent extends BaseComponentList<ITale> {
  tale$: Observable<ITale[]> = of([]);
  // Serch variables
  searchValue = '';
  visible = false;

  override breadcrumb: Breadcrumb = {
    header: "Ismlar", 
    label: "Ismlar ro'yhati", 
    url: '/tales'
  };

  constructor(
    private _taleSrv: TaleService,
    private _messageSrv: NzMessageService,
    private _breadcrumbSrv: BreadcrumbsService,
    private permissions: PermissionService,
    private permissionService: NgxPermissionsService,    
  ) {
    super(_taleSrv, _messageSrv, _breadcrumbSrv, permissions, permissionService);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    // let params = new HttpParams().set('gender', this.genderValue);
    this.tale$ = this._taleSrv._data.pipe(
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
    this.tale$ = this.tale$.pipe(
      switchMap((item) =>
        of(
          item.filter((item) =>
            item.title
              .toLocaleLowerCase()
              .includes(this.searchValue.toLocaleLowerCase())
          )
        )
      )
    );
  }
}
