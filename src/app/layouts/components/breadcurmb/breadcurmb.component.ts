import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';


@Component({
  selector: 'breadcrumb',
  templateUrl: './breadcurmb.component.html',
  styleUrls: ['./breadcurmb.component.scss']
})
export class BreadcurmbComponent implements OnInit , OnDestroy {
  private langSub!: Subscription;
  breadcrumbs$: any;

  constructor(
    private breadcrumbService: BreadcrumbsService,
  ) { }
  
  ngOnInit() {
    this.breadcrumbs$ = this.breadcrumbService.breadcrumbs$;
  }

  ngOnDestroy() {
    if (this.langSub) {
      this.langSub.unsubscribe();
    }
  }
}
