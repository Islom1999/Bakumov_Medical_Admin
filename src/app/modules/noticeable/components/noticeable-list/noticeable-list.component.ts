import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, of, switchMap } from 'rxjs';
import { BaseComponentList } from 'src/app/base/components/base-list';
import { INoticeable } from 'src/interfaces';
import { NoticeableService } from '../../service/noticeable.service';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { Breadcrumb } from 'src/types/breadcrump';

@Component({
  selector: 'app-noticeable-list',
  templateUrl: './noticeable-list.component.html',
  styleUrls: ['./noticeable-list.component.scss'],
})
export class NoticeableListComponent extends BaseComponentList<INoticeable> {
  noticeable$: Observable<INoticeable[]> = of([]);

  // Serch variables
  searchValue = '';
  visible = false;

  override breadcrumb: Breadcrumb = {
    header: "Muhim bo'limlar", 
    label: "Muhim bo'limlar ro'yhati", 
    url: '/noticeable'
  };

  constructor(_noticeableSrv: NoticeableService, _messageSrv: NzMessageService, private _breadcrumbSrv: BreadcrumbsService) {
    super(_noticeableSrv, _messageSrv, _breadcrumbSrv);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.noticeable$ = this.data$;
  }

  // Search reset function
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  // Search function
  search(): void {
    this.visible = false;
    this.noticeable$ = this.noticeable$.pipe(
      switchMap((item) =>
        of(
          item.filter((elem) =>
            elem.name
              .toLocaleLowerCase()
              .includes(this.searchValue.toLocaleLowerCase())
          )
        )
      )
    );
  }
}
