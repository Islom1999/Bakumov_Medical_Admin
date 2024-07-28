import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgxPermissionsService } from 'ngx-permissions';
import { Observable, of, switchMap } from 'rxjs';
import { BaseComponentList } from 'src/app/base/components/base-list';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { PermissionService } from 'src/app/shared/services/permission.service';
import { IOrderV2 } from 'src/interfaces/order';
import { Breadcrumb } from 'src/types/breadcrump';
import { OrderServicePending, OrderServiceV2 } from '../../service/order.service';
import { OrderDetailV2Component } from '../order-detail-v2/order-detail-v2.component';
import { OrderDetailComponent } from '../order-detail/order-detail.component';

@Component({
  selector: 'app-order-list-pending',
  templateUrl: './order-list-pending.component.html',
  styleUrls: ['./order-list-pending.component.scss']
})
export class OrderListPendingComponent extends BaseComponentList<IOrderV2> implements OnInit {
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
    private _baseSrv: OrderServicePending,
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
