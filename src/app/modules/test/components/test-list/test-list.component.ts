import { Component } from '@angular/core';
import { ITest } from 'src/interfaces';
import { TestService } from '../../service/test.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgxPermissionsService } from 'ngx-permissions';
import { Observable, of, tap, switchMap } from 'rxjs';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { PermissionService } from 'src/app/shared/services/permission.service';
import { Breadcrumb } from 'src/types/breadcrump';
import { BaseComponentList } from 'src/app/base/components/base-list';
import { TestInfoComponent } from '../test-info/test-info.component';
import { NzDrawerService } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.scss']
})
export class TestListComponent extends BaseComponentList<ITest> {
  test$: Observable<ITest[]> = of([]);
  // Serch variables
  searchValue = '';
  visible = false;

  override breadcrumb: Breadcrumb = {
    header: "Ismlar", 
    label: "Ismlar ro'yhati", 
    url: '/test'
  };

  constructor(
    private _testSrv: TestService,
    private _messageSrv: NzMessageService,
    private _breadcrumbSrv: BreadcrumbsService,
    private permissions: PermissionService,
    private permissionService: NgxPermissionsService, 
    private drawerService: NzDrawerService,   
  ) {
    super(_testSrv, _messageSrv, _breadcrumbSrv, permissions, permissionService);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    // let params = new HttpParams().set('gender', this.genderValue);
    this.test$ = this._testSrv._data.pipe(
      tap(() => {
        this.loading = false;
      })
    );
  }

  // Search reset function
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  // Search function
  search(): void {
    this.visible = false;
    this.test$ = this.test$.pipe(
      switchMap((item) =>
        of(
          item.filter((item) =>
            item.quession
              .toLocaleLowerCase()
              .includes(this.searchValue.toLocaleLowerCase())
          )
        )
      )
    );
  }

  open(id:string): void {
    this.drawerService.create<TestInfoComponent, { id: string }, string>({
      nzTitle: 'Foydalanuvchi ma\'lumotlari',
      nzContent: TestInfoComponent,
      nzSize: 'large',
      nzContentParams: {
        id: id
      }
    });
  }
}
