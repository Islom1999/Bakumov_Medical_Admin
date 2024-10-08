import { Component, OnInit } from '@angular/core';
import { Observable, of, switchMap, tap } from 'rxjs';
import { BaseComponentList } from 'src/app/base/components/base-list';
import { IName } from 'src/interfaces';
import { NamesService } from '../../service/names.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Gender } from 'src/enumerations';
import { HttpParams } from '@angular/common/http';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { Breadcrumb } from 'src/types/breadcrump';
import { PermissionService } from 'src/app/shared/services/permission.service';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-names-list',
  templateUrl: './names-list.component.html',
  styleUrls: ['./names-list.component.scss'],
})
export class NamesListComponent extends BaseComponentList<IName> implements OnInit {
  names$: Observable<IName[]> = of([]);
  gender: Gender[] = Object.values(Gender);
  genderValue: Gender = Gender.man;

  // Serch variables
  searchValue = '';
  visible = false;

  override breadcrumb: Breadcrumb = {
    header: "Ismlar", 
    label: "Ismlar ro'yhati", 
    url: '/names'
  };

  constructor(
    private _nameSrv: NamesService,
    private _messageSrv: NzMessageService,
    private _breadcrumbSrv: BreadcrumbsService,
    private permissions: PermissionService,
    private permissionService: NgxPermissionsService,    
  ) {
    super(_nameSrv, _messageSrv, _breadcrumbSrv, permissions, permissionService);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    // let params = new HttpParams().set('gender', this.genderValue);
    this.names$ = this._nameSrv._data.pipe(
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
    this.names$ = this.names$.pipe(
      switchMap((item) =>
        of(
          item.filter((article) =>
            article.name
              .toLocaleLowerCase()
              .includes(this.searchValue.toLocaleLowerCase())
          )
        )
      )
    );
  }

  filterParent(gender: Gender){
    let params = new HttpParams().set('gender', gender);
    this.names$ = this._nameSrv.getAll(params); 
  }
}
