import { Component, OnInit } from '@angular/core';
import { Observable, of, switchMap, tap } from 'rxjs';
import { BaseComponentList } from 'src/app/base/components/base-list';
import { INoticeable, INoticeableItem } from 'src/interfaces';
import { NoticeableItemService } from '../../service/noticeable-item.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NoticeableService } from 'src/app/modules/noticeable/service/noticeable.service';
import { HttpParams } from '@angular/common/http';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { Breadcrumb } from 'src/types/breadcrump';

@Component({
  selector: 'app-noticeable-item-list',
  templateUrl: './noticeable-item-list.component.html',
  styleUrls: ['./noticeable-item-list.component.scss']
})
export class NoticeableItemListComponent extends BaseComponentList<INoticeableItem> implements OnInit {
  noticeableItem$: Observable<INoticeableItem[]> = of([]);
  noticeable: Observable<INoticeable[]> = of([]);
  noticeableId!:string
  
  // Serch variables
  searchValue = '';
  visible = false;

  override breadcrumb: Breadcrumb = {
    header: "Muhim ma'lumotlar", 
    label: "Muhim ma'lumotlar ro'yhati", 
    url: '/noticeable-item'
  };

  constructor(
    private _noticeableItemSrv: NoticeableItemService,
    private _messageSrv: NzMessageService,
    private _noticeableSrv: NoticeableService,
    private _breadcrumbSrv: BreadcrumbsService
  ){
    super(_noticeableItemSrv, _messageSrv, _breadcrumbSrv);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.noticeableItem$ = this.data$.pipe(
      tap(() => {
        this.loading = false
      }) 
    )
    this.noticeable = this._noticeableSrv.getAll()
  }

  // Search reset function
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  // Search function
  search(): void {
    this.visible = false;
    this.noticeableItem$ = this.noticeableItem$.pipe(
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
      this.noticeableItem$ = this._noticeableItemSrv.getAll(params);
    }else{
      this.noticeableItem$ = this._noticeableItemSrv.getAll();
    }    
  }

}
