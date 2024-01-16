import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingListComponent } from './components/training-list/training-list.component';
import { TrainingDetailComponent } from './components/training-detail/training-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { BaseModule } from 'src/app/shared/modules';
import { UploadImageDirective } from 'src/app/shared/directives/ng-image-upload.directive';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

const router: Routes =  [
  {
    path: '',
    component: TrainingListComponent
  },
  {
    path: 'add',
    component: TrainingDetailComponent
  },
  {
    path: 'update/:id',
    component: TrainingDetailComponent
  }
] 

@NgModule({
  declarations: [
    TrainingListComponent,
    TrainingDetailComponent
  ],
  imports: [
    CommonModule,
    BaseModule,
    RouterModule.forChild(router),

    UploadImageDirective,
    NzModalModule,
    CKEditorModule,
  ]
})
export class TrainingModule { }
