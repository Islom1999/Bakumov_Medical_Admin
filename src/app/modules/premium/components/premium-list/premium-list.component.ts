import { Component } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgxPermissionsService } from 'ngx-permissions';
import { Observable, of, switchMap } from 'rxjs';
import { BaseComponentList } from 'src/app/base/components/base-list';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { PermissionService } from 'src/app/shared/services/permission.service';
import { IPremium } from 'src/interfaces/premium';
import { Breadcrumb } from 'src/types/breadcrump';
import { PremiumService } from '../../service/premium.service';

@Component({
  selector: 'app-premium-list',
  templateUrl: './premium-list.component.html',
  styleUrls: ['./premium-list.component.scss']
})
export class PremiumListComponent extends BaseComponentList<IPremium> {
  premiums$: Observable<IPremium[]> = of([]);
  
  // Serch variables
  searchValue = '';
  visible = false;

  override breadcrumb: Breadcrumb = {
    header: "Premium", 
    label: "Premium ro'yhati", 
    url: '/premium'
  };

  constructor(
    _premiumSrv: PremiumService, 
    _messageSrv: NzMessageService, 
    _breadcrumbSrv: BreadcrumbsService,
    private drawerService: NzDrawerService,
    private permissions: PermissionService,
    private permissionService: NgxPermissionsService, 
  ) {
    super(_premiumSrv, _messageSrv, _breadcrumbSrv, permissions, permissionService);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.premiums$ = this.data$;
  }

  // Search reset function
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  // Search function
  search(): void {
    this.visible = false;
    this.premiums$ = this.premiums$.pipe(
      switchMap((item) =>
        of(
          item.filter((premium) =>
            premium.name
              .toLocaleLowerCase()
              .includes(this.searchValue.toLocaleLowerCase())
          )
        )
      )
    );
  }
}
