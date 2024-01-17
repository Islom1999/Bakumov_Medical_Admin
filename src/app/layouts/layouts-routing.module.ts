import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsComponent } from './layouts.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutsComponent,
    children: [
      {
        path: 'role',
        loadChildren: () => import('../modules/index').then((modules) => modules.RoleModule)
      },
      {
        path: 'admin',
        loadChildren: () => import('../modules/index').then((modules) => modules.AdminModule)
      },
      {
        path: 'article',
        loadChildren: () => import('../modules/index').then((modules) => modules.ArticleModule)
      },
      {
        path: 'noticeable',
        loadChildren: () => import('../modules/index').then((modules) => modules.NoticeableModule)
      },
      {
        path: 'noticeable-item',
        loadChildren: () => import('../modules/index').then((modules) => modules.NoticeableItemModule)
      },
      {
        path: 'tools',
        loadChildren: () => import('../modules/index').then((modules) => modules.ToolsModule)
      },
      {
        path: 'names',
        loadChildren: () => import('../modules/index').then((modules) => modules.NamesModule)
      },
      {
        path: 'possible',
        loadChildren: () => import('../modules/index').then((modules) => modules.PossibleModule)
      },
      {
        path: 'possible-item',
        loadChildren: () => import('../modules/index').then((modules) => modules.PossibleItemModule)
      },
      {
        path: 'training',
        loadChildren: () => import('../modules/index').then((modules) => modules.TrainingModule)
      },
      {
        path: 'training-item',
        loadChildren: () => import('../modules/index').then((modules) => modules.TrainingItemModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutsRoutingModule {}
