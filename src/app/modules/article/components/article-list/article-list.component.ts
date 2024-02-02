import { Component, OnInit } from '@angular/core';
import { BaseComponentList } from 'src/app/base/components/base-list';
import { IArticle } from 'src/interfaces';
import { ArticleService } from '../../service/article.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, of, switchMap, tap } from 'rxjs';
import { Breadcrumb } from 'src/types/breadcrump';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { PermissionService } from 'src/app/shared/services/permission.service';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent extends BaseComponentList<IArticle> implements OnInit {
  articles$: Observable<IArticle[]> = of([]);
  
  // Serch variables
  searchValue = '';
  visible = false;

  override breadcrumb: Breadcrumb = {
    header: "Maqolalar", 
    label: "Maqolalar ro'yhati", 
    url: '/article'
  };

  constructor(
    private _articleSrv: ArticleService,
    private _messageSrv: NzMessageService,  
    private breadcrumbSrv: BreadcrumbsService,
    private permissions: PermissionService,
    private permissionService: NgxPermissionsService,  
  ){
    super(_articleSrv, _messageSrv, breadcrumbSrv, permissions, permissionService);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.loading = true
    this.articles$ = this.data$.pipe(
      tap(() => {
        this.loading = false
      }) 
    )

    this.articles$.subscribe(data  => {
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
    this.articles$ = this.articles$.pipe(
      switchMap((item) =>
        of(
          item.filter((article) =>
            article.title
              .toLocaleLowerCase()
              .includes(this.searchValue.toLocaleLowerCase())
          )
        )
      )
    );
  }

}
