import { Component, OnInit } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { BaseComponentList } from 'src/app/base/components/base-list';
import { IPlaylist } from 'src/interfaces';
import { Breadcrumb } from 'src/types/breadcrump';
import { PlaylistService } from '../../service/playlist.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { PermissionService } from 'src/app/shared/services/permission.service';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-playlist-list',
  templateUrl: './playlist-list.component.html',
  styleUrls: ['./playlist-list.component.scss']
})
export class PlaylistListComponent extends BaseComponentList<IPlaylist> implements OnInit {

  playlist$: Observable<IPlaylist[]> = of([]);

  // Serch variables
  searchValue = '';
  visible = false;

  override breadcrumb: Breadcrumb = {
    header: "Playlistlar", 
    label: "Playlistlar ro'yhati", 
    url: '/playlist'
  };

  constructor(
    _playlistSrv: PlaylistService, 
    _messageSrv: NzMessageService, 
    private _breadcrumbSrv: BreadcrumbsService,
    private permissions: PermissionService,
    private permissionService: NgxPermissionsService,  
  ) {
    super(_playlistSrv, _messageSrv, _breadcrumbSrv, permissions, permissionService);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.playlist$ = this.data$;
  }

  // Search reset function
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  // Search function
  search(): void {
    this.visible = false;
    this.playlist$ = this.playlist$.pipe(
      switchMap((item) =>
        of(
          item.filter((elem) =>
            elem.title
              .toLocaleLowerCase()
              .includes(this.searchValue.toLocaleLowerCase())
          )
        )
      )
    );
  }

}
