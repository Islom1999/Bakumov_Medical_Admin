import { Component, Input } from '@angular/core';
import { TestAnswerService } from '../../service/test.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, of } from 'rxjs';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-test-answer-detail',
  templateUrl: './test-answer-detail.component.html',
  styleUrls: ['./test-answer-detail.component.scss']
})
export class TestAnswerDetailComponent {
  loading = true;
  form: FormGroup = new FormGroup({});
  @Input()
  id?:string
  @Input()
  parent_id!:string


  constructor(
    private _testSrv: TestAnswerService,
    private nzMessageService: NzMessageService,
    private nzDraverRef: NzDrawerRef,
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      answer: new FormControl('', [Validators.required]),
      isTrue: new FormControl('', [Validators.required]),
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
      .create({ ...this.form.value, testId: this.parent_id })
      .pipe(
        catchError(({ error }) => {
          if (error?.statusCode == 409)
            this.nzMessageService.error(error?.message);
          return of();
        })
      )
      .subscribe(() => {
        this.nzMessageService.success('Create data');
        this.nzDraverRef.close()
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
        this.nzDraverRef.close()
      });
  }

  close(){
    this.nzDraverRef.close()
  }
}
