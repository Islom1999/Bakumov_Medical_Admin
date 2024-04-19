import { Component } from '@angular/core';
import { TestService } from '../../service/test.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-test-detail',
  templateUrl: './test-detail.component.html',
  styleUrls: ['./test-detail.component.scss']
})
export class TestDetailComponent {
  loading = true;
  
  form: FormGroup = new FormGroup({});

  get id() {
    return this.route.snapshot.params['id'];
  }

  constructor(
    private _testSrv: TestService,
    private nzMessageService: NzMessageService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      quession: new FormControl('', [Validators.required]),
    });

    if (this.id) {
      this._testSrv.getById(this.id).subscribe((item) => {
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
    this._testSrv
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
        this.router.navigate(['/', 'test']);
      });
  }

  update(id: string) {
    this._testSrv
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
        this.router.navigate(['/', 'test']);
      });
  }
}
