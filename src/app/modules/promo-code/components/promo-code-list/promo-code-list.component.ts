import { Component } from '@angular/core';
import { Observable, of, switchMap, tap } from 'rxjs';
import { BaseComponentList } from 'src/app/base/components/base-list';
import { IPromoCode } from 'src/interfaces/promo-code';
import { PromoCodeService } from '../../service/promo-code.service';
import { AdminService } from 'src/app/modules/admin/service/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IAdmin } from 'src/interfaces';
import { HttpParams } from '@angular/common/http';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { Breadcrumb } from 'src/types/breadcrump';

@Component({
  selector: 'app-promo-code-list',
  templateUrl: './promo-code-list.component.html',
  styleUrls: ['./promo-code-list.component.scss']
})
export class PromoCodeListComponent extends BaseComponentList<IPromoCode> {
  promoCode$: Observable<IPromoCode[]> = of([]);
  admin: Observable<IAdmin[]> = of([]);
  adminId!: string;

  // Serch variables
  searchValue = '';
  visible = false;

  override breadcrumb: Breadcrumb = {
    header: "Promocodelar", 
    label: "Promocodelar ro'yhati", 
    url: '/promo-code'
  };

  constructor(
    private _promoCodeSrv: PromoCodeService,
    private _adminSrv: AdminService,
    private _messageSrv: NzMessageService,
    private _breadcrumbSrv: BreadcrumbsService
  ) {
    super(_promoCodeSrv, _messageSrv, _breadcrumbSrv);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.promoCode$ = this.data$.pipe(
      tap(() => {
        this.loading = false;
      })
    );
    this.admin = this._adminSrv.getAll();
  }

  // Search reset function
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  // Search function
  search(): void {
    this.visible = false;
    this.promoCode$ = this.promoCode$.pipe(
      switchMap((item) =>
        of(
          item.filter((elem) =>
            elem.code
              .toLocaleLowerCase()
              .includes(this.searchValue.toLocaleLowerCase())
          )
        )
      )
    );
  }

  filterParent(selectedId: string) {
    if (selectedId) {
      let params = new HttpParams().set('parent_id', selectedId.toString());
      this.promoCode$ = this._promoCodeSrv.getAll(params);
    } else {
      this.promoCode$ = this._promoCodeSrv.getAll();
    }
  }
}
