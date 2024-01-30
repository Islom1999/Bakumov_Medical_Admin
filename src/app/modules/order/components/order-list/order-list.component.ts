import { Component, OnInit } from '@angular/core';
import { Observable, of, switchMap, tap } from 'rxjs';
import { BaseComponentList } from 'src/app/base/components/base-list';
import { IOrder } from 'src/interfaces/order';
import { Breadcrumb } from 'src/types/breadcrump';
import { OrderService } from '../../service/order.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { OrderDetailComponent } from '../order-detail/order-detail.component';
import { NzDrawerService } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent extends BaseComponentList<IOrder> implements OnInit {
  order$: Observable<IOrder[]> = of([]);
  
  // Serch variables
  // visibleDetail = false;
  searchValueName = '';
  searchValuePhone = '';
  searchValuePremium = '';
  searchValueSuccess = true;
  visibleName = false;
  visiblePhone = false;
  visiblePremium = false;
  visibleSuccess = false;

  override breadcrumb: Breadcrumb = {
    header: "Orderlar", 
    label: "Orderlar ro'yhati", 
    url: '/order'
  };

  constructor(
    private _orderSrv: OrderService,
    private _messageSrv: NzMessageService,  
    private breadcrumbSrv: BreadcrumbsService,
    private drawerService: NzDrawerService
  ){
    super(_orderSrv, _messageSrv, breadcrumbSrv);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.loading = true
    this.order$ = this.data$.pipe(
      tap(() => {
        this.loading = false
      }) 
    )

    this.order$.subscribe(data  => {
      this.loading = false
    })
    
  }

  // Search reset function
  resetName(): void {
    this.searchValueName = '';
    this.searchName();
  }

  resetPhone(): void {
    this.searchValuePhone = '';
    this.searchPhone();
  }

  resetPremium(): void {
    this.searchValuePremium = '';
    this.searchPremium();
  }

  resetSuccess(): void {
    this.order$ = this.data$
  }

  // Search function
  searchName(): void {
    this.visibleName = false;
    this.order$ = this.order$.pipe(
      switchMap((item) =>
        of(
          item.filter((order) =>
            order.user?.fullname
              .toLocaleLowerCase()
              .includes(this.searchValueName.toLocaleLowerCase())
          )
        )
      )
    );
  }

  searchPhone(): void {
    this.visiblePhone = false;
    this.order$ = this.order$.pipe(
      switchMap((item) =>
        of(
          item.filter((order) =>
            order.user?.phone
              .toString()
              .includes(this.searchValuePhone.toString())
          )
        )
      )
    );
  }

  searchPremium(): void {
    this.visiblePremium = false;
    this.order$ = this.order$.pipe(
      switchMap((item) =>
        of(
          item.filter((order) =>
            order.premium?.name
              .toLocaleLowerCase()
              .includes(this.searchValuePremium.toLocaleLowerCase())
          )
        )
      )
    );
  }

  searchSuccess(): void {
    this.visibleSuccess = false;
    this.order$ = this.order$.pipe(
      switchMap((item) =>
        of(
          item.filter((order) =>
            order.success == this.searchValueSuccess
          )
        )
      )
    );
  }

  open(id:string): void {
    this.drawerService.create<OrderDetailComponent, { id: string }, string>({
      nzTitle: 'To\'liq ma\'lumotlari',
      nzContent: OrderDetailComponent,
      nzSize: 'large',
      nzContentParams: {
        id: id
      }
    });
  }


}
