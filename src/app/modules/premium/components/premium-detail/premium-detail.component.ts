import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, of } from 'rxjs';
import { PremiumMonth } from 'src/enumerations';
import { PremiumService } from '../../service/premium.service';

@Component({
  selector: 'app-premium-detail',
  templateUrl: './premium-detail.component.html',
  styleUrls: ['./premium-detail.component.scss']
})
export class PremiumDetailComponent {
  premuimType: PremiumMonth[] = Object.values(PremiumMonth);
  loading = true;
  disableBtn = true;

  form: FormGroup = new FormGroup({});

  get id() {
    return this.route.snapshot.params['id'];
  }

  constructor(
    private _premuimSrv: PremiumService,
    private nzMessageService: NzMessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      month: new FormControl(PremiumMonth.month_0, [Validators.required]),
      isActive: new FormControl(false, [Validators.required]),
      price: new FormControl(1000, [Validators.required, Validators.min(1000)]),
    });
    if (this.id) {
      this._premuimSrv.getById(this.id).subscribe((premuim) => {
        this.form.patchValue(premuim);
        this.disableBtn = false;
        this.loading = false;
      });
    } else {
      this.loading = false;
      this.disableBtn = false;
    }
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
    this._premuimSrv
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
        this.router.navigate(['/', 'premium']);
      });
  }

  update(id: string) {
    this._premuimSrv
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
        this.router.navigate(['/', 'premium']);
      });
  }
}
