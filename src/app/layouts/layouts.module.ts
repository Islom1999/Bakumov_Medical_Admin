import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsComponent } from './layouts.component';
import { LayoutsRoutingModule } from './layouts-routing.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { BreadcurmbComponent } from './components/breadcurmb/breadcurmb.component';
import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
  declarations: [
    LayoutsComponent,
    BreadcurmbComponent,
  ],
  imports: [
    CommonModule,
    LayoutsRoutingModule,
    NgxPermissionsModule,

    NzLayoutModule,
    NzBreadCrumbModule,
    NzIconModule,
    NzMenuModule,
  ]
})
export class LayoutsModule { }
