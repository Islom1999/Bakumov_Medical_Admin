import { Component } from '@angular/core';
import { Observable, of, switchMap, tap } from 'rxjs';
import { BaseComponentList } from 'src/app/base/components/base-list';
import { IMessage } from 'src/interfaces/message';
import { Breadcrumb } from 'src/types/breadcrump';
import { MessageService } from '../../service/message.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { PermissionService } from 'src/app/shared/services/permission.service';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent extends BaseComponentList<IMessage> {
  message$: Observable<IMessage[]> = of([]);
  
  // Serch variables
  searchValue = '';
  visible = false;
  
  searchSending = '';
  visibleSending = false;

  override breadcrumb: Breadcrumb = {
    header: "Xabarlar", 
    label: "Xabarlar ro'yhati", 
    url: '/message'
  };

  constructor(
    private _messagesSrv: MessageService,
    private _messageSrv: NzMessageService,  
    private breadcrumbSrv: BreadcrumbsService,
    private permissions: PermissionService,
    private permissionService: NgxPermissionsService,  
  ){
    super(_messagesSrv, _messageSrv, breadcrumbSrv, permissions, permissionService);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.loading = true
    this.message$ = this.data$.pipe(
      tap(() => {
        this.loading = false
      }) 
    )

    this.message$.subscribe(data  => {
      this.loading = false
    })
    
  }

  // Search reset function
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  // Search function
  search(): void {
    this.visible = false;
    this.message$ = this.message$.pipe(
      switchMap((item) =>
        of(
          item.filter((messages) =>
            messages.title
              .toLocaleLowerCase()
              .includes(this.searchValue.toLocaleLowerCase())
          )
        )
      )
    );
  }

  searchSendingBy(): void {
    this.visibleSending = false;
    this.message$ = this.message$.pipe(
      switchMap((item) =>
        of(
          item.filter((item) =>
            item.sending_by
              .toLocaleLowerCase()
              .includes(this.searchSending.toLocaleLowerCase())
          )
        )
      )
    );
  }

  resetSendingBy(){
    this.searchSending = '';
    this.searchSendingBy();
  }
}
