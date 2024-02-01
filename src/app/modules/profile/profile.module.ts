import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileInfoComponent } from './component/profile-info/profile-info.component';
import { PromocodeInfoComponent } from './component/promocode-info/promocode-info.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { BaseModule } from 'src/app/shared/modules';
import { RouterModule, Routes } from '@angular/router';
import { PromocodeListComponent } from './component/promocode-list/promocode-list.component';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzTagModule } from 'ng-zorro-antd/tag';

const router: Routes=[
  {
    path: '',
    component: ProfileInfoComponent
  }
]

@NgModule({
  declarations: [
    ProfileInfoComponent,
    PromocodeInfoComponent,
    PromocodeListComponent
  ],
  imports: [
    CommonModule,
    BaseModule,
    RouterModule.forChild(router),

    NzTabsModule,
    NzDrawerModule,
    NzTagModule
  ]
})
export class ProfileModule { }
