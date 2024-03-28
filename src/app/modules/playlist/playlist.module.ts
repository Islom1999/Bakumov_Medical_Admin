import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistDetailComponent } from './components/playlist-detail/playlist-detail.component';
import { PlaylistListComponent } from './components/playlist-list/playlist-list.component';
import { RouterModule, Routes } from '@angular/router';
import { canActivatePermission } from 'src/app/shared/guards/permission-guard';
import { BaseModule } from 'src/app/shared/modules';
import { UploadImageDirective } from 'src/app/shared/directives/ng-image-upload.directive';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NzModalModule } from 'ng-zorro-antd/modal';

const router: Routes =  [
  {
    path: '',
    component: PlaylistListComponent
  },
  {
    path: 'add',
    component: PlaylistDetailComponent,
    canActivate: [canActivatePermission],
    data: { permissions: ['data_create'] }
  },
  {
    path: 'update/:id',
    component: PlaylistDetailComponent,
    canActivate: [canActivatePermission],
    data: { permissions: ['data_update'] }
  }
] 

@NgModule({
  declarations: [
    PlaylistDetailComponent,
    PlaylistListComponent
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
export class PlaylistModule { }
