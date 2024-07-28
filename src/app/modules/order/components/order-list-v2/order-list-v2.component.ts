import { Component } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgxPermissionsService } from 'ngx-permissions';
import { Observable, of, switchMap } from 'rxjs';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { PermissionService } from 'src/app/shared/services/permission.service';
import { IOrderV2 } from 'src/interfaces/order';
import { Breadcrumb } from 'src/types/breadcrump';
import { OrderServiceV2 } from '../../service/order.service';
import { OrderDetailComponent } from '../order-detail/order-detail.component';
import { BaseComponentList } from 'src/app/base/components/base-list';
import { OrderDetailV2Component } from '../order-detail-v2/order-detail-v2.component';

@Component({
  selector: 'app-order-list-v2',
  templateUrl: './order-list-v2.component.html',
  styleUrls: ['./order-list-v2.component.scss']
})
export class OrderListV2Component extends BaseComponentList<IOrderV2> {
  orders$: Observable<IOrderV2[]> = of([]);

  // Serch variables
  searchValue = '';
  visible = false;

  override breadcrumb: Breadcrumb = {
    header: "Orderlar", 
    label: "Orderlar ro'yhati", 
    url: '/order-order'
  };

  constructor(
    private _baseSrv: OrderServiceV2,
    private _nzMessageService: NzMessageService,
    private _breadcrumbService: BreadcrumbsService,
    private _permission: PermissionService,
    private _permissionSrv: NgxPermissionsService,  
    private drawerService: NzDrawerService,
  ){
    super(_baseSrv, _nzMessageService, _breadcrumbService, _permission, _permissionSrv)
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.orders$ = this.data$;
  }
  
  // Search reset function
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  // Search function
  search(): void {
    this.visible = false;
    this.orders$ = this.orders$.pipe(
      switchMap((item) =>
        of(
          item.filter((order) =>
            order.tid
              .toLocaleLowerCase()
              .includes(this.searchValue.toLocaleLowerCase())
          )
        )
      )
    );
  }

  open1(id:string): void {
    this.drawerService.create<OrderDetailComponent, { id: string }, string>({
      nzTitle: 'Order premium ma\'lumotlari',
      nzContent: OrderDetailComponent,
      nzSize: 'large',
      nzContentParams: {
        id: id,
      }
    });
  }

  open2(id:string): void {
    this.drawerService.create<OrderDetailV2Component, { id: string }, string>({
      nzTitle: 'Order premium ma\'lumotlari',
      nzContent: OrderDetailV2Component,
      nzSize: 'large',
      nzContentParams: {
        id: id,
      }
    });
  }
}
