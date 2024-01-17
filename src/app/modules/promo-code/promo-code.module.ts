import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromoCodeListComponent } from './components/promo-code-list/promo-code-list.component';
import { PromoCodeDetailComponent } from './components/promo-code-detail/promo-code-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { BaseModule } from 'src/app/shared/modules';

const router: Routes =  [
  {
    path: '',
    component: PromoCodeListComponent
  },
  {
    path: 'add',
    component: PromoCodeDetailComponent
  },
  {
    path: 'update/:id',
    component: PromoCodeDetailComponent
  }
] 

@NgModule({
  declarations: [
    PromoCodeListComponent,
    PromoCodeDetailComponent
  ],
  imports: [
    CommonModule,
    BaseModule,
    RouterModule.forChild(router)
  ]
})
export class PromoCodeModule { }
