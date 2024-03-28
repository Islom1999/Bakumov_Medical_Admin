import { Component, OnInit } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { BaseComponentList } from 'src/app/base/components/base-list';
import { IVideo } from 'src/interfaces/video';
import { Breadcrumb } from 'src/types/breadcrump';
import { VideoService } from '../../service/video.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { PermissionService } from 'src/app/shared/services/permission.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { IPlaylist } from 'src/interfaces';
import { PlaylistService } from 'src/app/modules/playlist/service/playlist.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent extends BaseComponentList<IVideo> implements OnInit {
  video$: Observable<IVideo[]> = of([]);
  playlist: Observable<IPlaylist[]> = of([]);
  playlistId!:string

  // Serch variables
  searchValue = '';
  visible = false;

  override breadcrumb: Breadcrumb = {
    header: "Videolar", 
    label: "Videolar ro'yhati", 
    url: '/video'
  };

  constructor(
    private _videoSrv: VideoService, 
    private _playlistSrv: PlaylistService, 
    private _messageSrv: NzMessageService, 
    private _breadcrumbSrv: BreadcrumbsService,
    private permissions: PermissionService,
    private permissionService: NgxPermissionsService,  
  ) {
    super(_videoSrv, _messageSrv, _breadcrumbSrv, permissions, permissionService);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.video$ = this.data$;
    this.playlist = this._playlistSrv.getAll()
  }

  // Search reset function
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  // Search function
  search(): void {
    this.visible = false;
    this.video$ = this.video$.pipe(
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

  filterParent(selectedId: string){
    if(selectedId){
      let params = new HttpParams().set('parent_id', selectedId.toString());
      this.video$ = this._videoSrv.getAll(params);
    }else{
      this.video$ = this._videoSrv.getAll();
    }    
  }
}
