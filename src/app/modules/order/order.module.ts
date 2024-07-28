import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { BaseModule } from 'src/app/shared/modules';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NgxPermissionsModule } from 'ngx-permissions';
import { OrderListV2Component } from './components/order-list-v2/order-list-v2.component';
import { OrderDetailV2Component } from './components/order-detail-v2/order-detail-v2.component';
import { OrderRootComponent } from './components/order-root/order-root.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';


const router: Routes = [
  {
    path: "",
    component: OrderRootComponent
  },
  {
    path: "v2",
    component: OrderListV2Component
  },
  {
    path: 'v1',
    component: OrderListComponent
  },
  {
    path: 'v2/view',
    component: OrderDetailV2Component
  },
]

@NgModule({
  declarations: [
    OrderListComponent,
    OrderDetailComponent,
    OrderListV2Component,
    OrderDetailV2Component,
    OrderRootComponent
  ],
  imports: [
    CommonModule,
    BaseModule,
    RouterModule.forChild(router),

    NzTagModule,
    NzDrawerModule,
    NzTabsModule,
  ]
})
export class OrderModule { }
