import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsComponent } from './layouts.component';
import { canActivatePermission } from '../shared/guards/permission-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full'
  },
  {
    path: '',
    component: LayoutsComponent,
    children: [
      {
        path: 'role',
        loadChildren: () => import('../modules/index').then((modules) => modules.RoleModule),
        canActivate: [canActivatePermission],
        data: { permissions: ['role_view'] }
      },
      {
        path: 'admin',
        loadChildren: () => import('../modules/index').then((modules) => modules.AdminModule),
        canActivate: [canActivatePermission],
        data: { permissions: ['admin_view'] }
      },
      {
        path: 'article',
        loadChildren: () => import('../modules/index').then((modules) => modules.ArticleModule),
        canActivate: [canActivatePermission],
        data: { permissions: ['data_view'] }
      },
      {
        path: 'noticeable',
        loadChildren: () => import('../modules/index').then((modules) => modules.NoticeableModule),
        canActivate: [canActivatePermission],
        data: { permissions: ['data_view'] }
      },
      {
        path: 'noticeable-item',
        loadChildren: () => import('../modules/index').then((modules) => modules.NoticeableItemModule),
        canActivate: [canActivatePermission],
        data: { permissions: ['data_view'] }
      },
      {
        path: 'playlist',
        loadChildren: () => import('../modules/index').then((modules) => modules.PlaylistModule),
        canActivate: [canActivatePermission],
        data: { permissions: ['data_view'] }
      },
      {
        path: 'video',
        loadChildren: () => import('../modules/index').then((modules) => modules.VideoModule),
        canActivate: [canActivatePermission],
        data: { permissions: ['data_view'] }
      },
      {
        path: 'tools',
        loadChildren: () => import('../modules/index').then((modules) => modules.ToolsModule),
        canActivate: [canActivatePermission],
        data: { permissions: ['data_view'] }
      },
      {
        path: 'names',
        loadChildren: () => import('../modules/index').then((modules) => modules.NamesModule),
        canActivate: [canActivatePermission],
        data: { permissions: ['data_view'] }
      },
      {
        path: 'possible',
        loadChildren: () => import('../modules/index').then((modules) => modules.PossibleModule),
        canActivate: [canActivatePermission],
        data: { permissions: ['data_view'] }
      },
      {
        path: 'possible-item',
        loadChildren: () => import('../modules/index').then((modules) => modules.PossibleItemModule),
        canActivate: [canActivatePermission],
        data: { permissions: ['data_view'] }
      },
      {
        path: 'tale',
        loadChildren: () => import('../modules/index').then((modules) => modules.TaleModule),
        canActivate: [canActivatePermission],
        data: { permissions: ['data_view'] }
      },
      {
        path: 'test',
        loadChildren: () => import('../modules/index').then((modules) => modules.TestModule),
        canActivate: [canActivatePermission],
        data: { permissions: ['data_view'] }
      },
      {
        path: 'vaccine',
        loadChildren: () => import('../modules/index').then((modules) => modules.VaccineModule),
        canActivate: [canActivatePermission],
        data: { permissions: ['data_view'] }
      },
      {
        path: 'training',
        loadChildren: () => import('../modules/index').then((modules) => modules.TrainingModule),
        canActivate: [canActivatePermission],
        data: { permissions: ['data_view'] }
      },
      {
        path: 'message',
        loadChildren: () => import('../modules/index').then((modules) => modules.MessageModule),
        canActivate: [canActivatePermission],
        data: { permissions: ['data_view'] }
      },
      // {
      //   path: 'training-item',
      //   loadChildren: () => import('../modules/index').then((modules) => modules.TrainingItemModule)
      // },
      {
        path: 'promo-code',
        loadChildren: () => import('../modules/index').then((modules) => modules.PromoCodeModule),
        canActivate: [canActivatePermission],
        data: { permissions: ['promo_view'] }
      },
      {
        path: 'premium',
        loadChildren: () => import('../modules/index').then((modules) => modules.PremiumModule),
        canActivate: [canActivatePermission],
        data: { permissions: ['admin_view'] }
      },
      {
        path: 'client',
        loadChildren: () => import('../modules/index').then((modules) => modules.UserModule),
        canActivate: [canActivatePermission],
        data: { permissions: ['client_view'] }
      },
      {
        path: 'order',
        loadChildren: () => import('../modules/index').then((modules) => modules.OrderModule),
        canActivate: [canActivatePermission],
        data: { permissions: ['order_view'] }
      },
      {
        path: 'profile',
        loadChildren: () => import('../modules/index').then((modules) => modules.ProfileModule),
        canActivate: [canActivatePermission],
        data: { permissions: ['profile_view'] }
      },
      {
        path: 'settings',
        loadChildren: () => import('../modules/index').then((modules) => modules.SettingsModule),
        canActivate: [canActivatePermission],
        data: { permissions: ['data_view'] }
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'profile'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutsRoutingModule {}
