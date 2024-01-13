import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, of, switchMap } from 'rxjs';
import { BaseComponentList } from 'src/app/base/components/base-list';
import { INoticeable } from 'src/interfaces';
import { NoticeableService } from '../../service/noticeable.service';

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

  constructor(_noticeableSrv: NoticeableService, _messageSrv: NzMessageService) {
    super(_noticeableSrv, _messageSrv);
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
