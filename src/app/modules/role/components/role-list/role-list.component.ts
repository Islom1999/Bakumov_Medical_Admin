import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../service/role.service';
import { IRole } from 'src/interfaces';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, filter, of, switchMap } from 'rxjs';
import { BaseList } from 'src/app/base/components/base-list';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss'],
})
export class RoleListComponent extends BaseList<IRole> {
  roles$: Observable<IRole[]> = of([]);
  
  // Serch variables
  rolesFilter$: Observable<IRole[]> = of([]); 
  searchValue = '';
  visible = false;

  constructor(baseSrv: RoleService, nzMessageService: NzMessageService) {
    super(baseSrv, nzMessageService);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.roles$ = this.data$;
    this.rolesFilter$ = this.data$;
  }

  // Search reset function
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  // Search function
  search(): void {
    this.visible = false;
    this.roles$ = this.roles$.pipe(
      switchMap((item) =>
        of(
          item.filter((role) =>
            role.title
              .toLocaleLowerCase()
              .includes(this.searchValue.toLocaleLowerCase())
          )
        )
      )
    );
  }
}