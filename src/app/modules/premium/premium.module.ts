import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PremiumListComponent } from './components/premium-list/premium-list.component';
import { PremiumDetailComponent } from './components/premium-detail/premium-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { canActivatePermission } from 'src/app/shared/guards/permission-guard';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { UploadImageDirective } from 'src/app/shared/directives/ng-image-upload.directive';
import { BaseModule } from 'src/app/shared/modules';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';

const router: Routes =  [
  {
    path: '',
    component: PremiumListComponent,
  },
  {
    path: 'add',
    component: PremiumDetailComponent,
    canActivate: [canActivatePermission],
    data: { permissions: ['data_create'] }
  },
  {
    path: 'update/:id',
    component: PremiumDetailComponent,
    canActivate: [canActivatePermission],
    data: { permissions: ['data_update'] }
  }
] 

@NgModule({
  declarations: [
    PremiumListComponent,
    PremiumDetailComponent
  ],
  imports: [
    CommonModule,
    BaseModule,
    RouterModule.forChild(router),

    NzDrawerModule,
  ]
})
export class PremiumModule { }
