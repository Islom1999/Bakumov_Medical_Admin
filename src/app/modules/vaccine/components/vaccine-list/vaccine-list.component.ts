import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgxPermissionsService } from 'ngx-permissions';
import { Observable, of, tap, switchMap } from 'rxjs';
import { BaseComponentList } from 'src/app/base/components/base-list';
import { BaseApiService } from 'src/app/base/services/base-api.service';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { PermissionService } from 'src/app/shared/services/permission.service';
import { IVaccine } from 'src/interfaces';
import { Breadcrumb } from 'src/types/breadcrump';
import { VaccineService } from '../../service/vaccine.service';

@Component({
  selector: 'app-vaccine-list',
  templateUrl: './vaccine-list.component.html',
  styleUrls: ['./vaccine-list.component.scss']
})
export class VaccineListComponent extends BaseComponentList<IVaccine>{
  vaccine$: Observable<IVaccine[]> = of([]);
  // Serch variables
  searchValue = '';
  visible = false;

  override breadcrumb: Breadcrumb = {
    header: "Ismlar", 
    label: "Ismlar ro'yhati", 
    url: '/vaccine'
  };

  constructor(
    private _vaccineSrv: VaccineService,
    private _messageSrv: NzMessageService,
    private _breadcrumbSrv: BreadcrumbsService,
    private permissions: PermissionService,
    private permissionService: NgxPermissionsService,    
  ) {
    super(_vaccineSrv, _messageSrv, _breadcrumbSrv, permissions, permissionService);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    // let params = new HttpParams().set('gender', this.genderValue);
    this.vaccine$ = this._vaccineSrv._data.pipe(
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
    this.vaccine$ = this.vaccine$.pipe(
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
