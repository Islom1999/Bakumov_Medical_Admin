import { Component, Input, OnInit } from '@angular/core';
import { PromoCodeService } from 'src/app/modules/promo-code/service/promo-code.service';
import { IPromoCode } from 'src/interfaces';

@Component({
  selector: 'app-promocode-info',
  templateUrl: './promocode-info.component.html',
  styleUrls: ['./promocode-info.component.scss']
})
export class PromocodeInfoComponent implements OnInit {
  @Input()
  id!: string
  promoCode!: IPromoCode
  
  constructor(
    private _promoSrv: PromoCodeService  
  ){}
  
  ngOnInit(): void {
    this._promoSrv.getById(this.id).subscribe((promo) => {
      this.promoCode = promo
    })
  }
}
