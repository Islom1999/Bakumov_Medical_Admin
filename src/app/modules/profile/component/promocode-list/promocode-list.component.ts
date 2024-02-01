import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { PromoCodeService } from 'src/app/modules/promo-code/service/promo-code.service';
import { IPromoCode } from 'src/interfaces';
import { PromocodeInfoComponent } from '../promocode-info/promocode-info.component';

@Component({
  selector: 'app-promocode-list',
  templateUrl: './promocode-list.component.html',
  styleUrls: ['./promocode-list.component.scss']
})
export class PromocodeListComponent implements OnInit {
  promo!: IPromoCode[]
  loading = false

  searchValue = '';
  visible = false;

  constructor(
    private _promoSrv: PromoCodeService,  
    private drawerService: NzDrawerService
  ){}

  ngOnInit(): void {
    this._promoSrv.getAllMe().subscribe(promo => {
      this.promo = promo
    })
  }

  open(id:string): void {
    this.drawerService.create<PromocodeInfoComponent, { id: string }, string>({
      nzTitle: 'Promocode ma\'lumotlari',
      nzContent: PromocodeInfoComponent,
      nzSize: 'large',
      nzContentParams: {
        id: id
      }
    });
  }
}
