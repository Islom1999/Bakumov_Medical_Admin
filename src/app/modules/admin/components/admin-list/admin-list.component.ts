import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BaseComponentList } from 'src/app/base/components/base-list';
import { IAdmin } from 'src/interfaces';
import { AdminService } from '../../service/admin.service';
import { Observable, of, switchMap } from 'rxjs';

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

  constructor(
    _adminSrv: AdminService,
    _messageSrv: NzMessageService  
  ){
    super(_adminSrv, _messageSrv)
  }

  override ngOnInit(): void {
    super.ngOnInit();
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

}
