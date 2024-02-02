import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromoCodeListComponent } from './components/promo-code-list/promo-code-list.component';
import { PromoCodeDetailComponent } from './components/promo-code-detail/promo-code-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { BaseModule } from 'src/app/shared/modules';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { PromoCodeInfoComponent } from './components/promo-code-info/promo-code-info.component';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { canActivatePermission } from 'src/app/shared/guards/permission-guard';

const router: Routes =  [
  {
    path: '',
    component: PromoCodeListComponent
  },
  {
    path: 'add',
    component: PromoCodeDetailComponent,
    canActivate: [canActivatePermission],
    data: { permissions: ['promo_create'] }
  },
  {
    path: 'update/:id',
    component: PromoCodeDetailComponent,
    canActivate: [canActivatePermission],
    data: { permissions: ['promo_update'] }
  }
] 

@NgModule({
  declarations: [
    PromoCodeListComponent,
    PromoCodeDetailComponent,
    PromoCodeInfoComponent
  ],
  imports: [
    CommonModule,
    BaseModule,
    RouterModule.forChild(router),

    NzDrawerModule,
    NzTagModule
  ]
})
export class PromoCodeModule { }
