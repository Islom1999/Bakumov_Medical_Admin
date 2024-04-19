import { Component } from '@angular/core';
import { VaccineService } from '../../service/vaccine.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-vaccine-detail',
  templateUrl: './vaccine-detail.component.html',
  styleUrls: ['./vaccine-detail.component.scss']
})
export class VaccineDetailComponent {
  loading = true;
  
  form: FormGroup = new FormGroup({});

  get id() {
    return this.route.snapshot.params['id'];
  }

  constructor(
    private _vaccineSrv: VaccineService,
    private nzMessageService: NzMessageService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
    });

    if (this.id) {
      this._vaccineSrv.getById(this.id).subscribe((item) => {
        this.form.patchValue(item);
        this.loading = false;
      });
    } else {
      this.loading = false;
    }
  }

  submit() {
    if (this.form.valid) {
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
    this._vaccineSrv
      .create({ ...this.form.value })
      .pipe(
        catchError(({ error }) => {
          if (error?.statusCode == 409)
            this.nzMessageService.error(error?.message);
          return of();
        })
      )
      .subscribe(() => {
        this.nzMessageService.success('Create data');
        this.router.navigate(['/', 'vaccine']);
      });
  }

  update(id: string) {
    this._vaccineSrv
      .update(id, { ...this.form.value })
      .pipe(
        catchError(({ error }) => {
          if (error?.statusCode == 409)
            this.nzMessageService.error(error?.message);
          return of();
        })
      )
      .subscribe(() => {
        this.nzMessageService.success('Update data');
        this.router.navigate(['/', 'vaccine']);
      });
  }
}
