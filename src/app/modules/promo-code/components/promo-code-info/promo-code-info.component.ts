import { Component, Input, OnInit } from '@angular/core';
import { PromoCodeService } from '../../service/promo-code.service';
import { IPromoCode } from 'src/interfaces';

@Component({
  selector: 'app-promo-code-info',
  templateUrl: './promo-code-info.component.html',
  styleUrls: ['./promo-code-info.component.scss']
})
export class PromoCodeInfoComponent implements OnInit {
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
