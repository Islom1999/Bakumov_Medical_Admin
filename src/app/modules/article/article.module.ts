import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { BaseModule } from 'src/app/shared/modules';
import { RouterModule, Routes } from '@angular/router';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { NzModalModule } from 'ng-zorro-antd/modal';
import { UploadImageDirective } from 'src/app/shared/directives/ng-image-upload.directive';
import { NgxPermissionsModule } from 'ngx-permissions';
import { canActivatePermission } from 'src/app/shared/guards/permission-guard';


const router: Routes =  [
  {
    path: '',
    component: ArticleListComponent
  },
  {
    path: 'add',
    component: ArticleDetailComponent,
    canActivate: [canActivatePermission],
    data: { permissions: ['data_create'] }
  },
  {
    path: 'update/:id',
    component: ArticleDetailComponent,
    canActivate: [canActivatePermission],
    data: { permissions: ['data_update'] }
  }
] 

@NgModule({
  declarations: [
    ArticleListComponent,
    ArticleDetailComponent,
  ],
  imports: [
    CommonModule,
    BaseModule,
    RouterModule.forChild(router),
    UploadImageDirective,
    
    CKEditorModule,
    NzModalModule,
  ]
})
export class ArticleModule { }
