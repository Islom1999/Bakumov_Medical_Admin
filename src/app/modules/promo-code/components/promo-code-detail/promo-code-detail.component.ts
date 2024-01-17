import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PromoCodeService } from '../../service/promo-code.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { IAdmin } from 'src/interfaces';
import { AdminService } from 'src/app/modules/admin/service/admin.service';

@Component({
  selector: 'app-promo-code-detail',
  templateUrl: './promo-code-detail.component.html',
  styleUrls: ['./promo-code-detail.component.scss']
})
export class PromoCodeDetailComponent {
  admin: Observable<IAdmin[]> = of([]);
  loading = true;
  disableBtn = true;

  form: FormGroup = new FormGroup({});

  get id() {
    return this.route.snapshot.params['id'];
  }

  constructor(
    private _promoCodeSrv: PromoCodeService,
    private _adminSrv: AdminService,
    private nzMessageService: NzMessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      code: new FormControl('', [Validators.required]),
      discount: new FormControl('', [Validators.required]),
      isActive: new FormControl('', [Validators.required]),
      adminId: new FormControl(''),
    });
    if (this.id) {
      this._promoCodeSrv.getById(this.id).subscribe((promoCode) => {
        this.form.patchValue(promoCode);
        this.disableBtn = false;
        this.loading = false;
      });
    } else {
      this.loading = false;
      this.disableBtn = false;
    }
    this.admin = this._adminSrv._data
  }

  submit() {
    if (this.form.valid) {
      this.disableBtn = true;
      if (this.id) {
        this.update(this.id);
      } else {
        this.create();
      }
    } else {
      Object.values(this.form.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  create() {
    this._promoCodeSrv
      .create(this.form.value)
      .pipe(
        catchError(({ error }) => {
          if (error?.statusCode == 409)
            this.nzMessageService.error(error?.message);
          this.disableBtn = false;
          return of();
        })
      )
      .subscribe(() => {
        this.nzMessageService.success('Create data');
        this.router.navigate(['/', 'promo-code']);
      });
  }

  update(id: string) {
    this._promoCodeSrv
      .update(id, this.form.value)
      .pipe(
        catchError(({ error }) => {
          if (error?.statusCode == 409)
            this.nzMessageService.error(error?.message);
          this.disableBtn = false;
          return of();
        })
      )
      .subscribe(() => {
        this.nzMessageService.success('Update data');
        this.router.navigate(['/', 'promo-code']);
      });
  }
}
