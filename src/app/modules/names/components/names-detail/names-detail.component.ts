import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NamesService } from '../../service/names.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from 'src/app/shared/services/image.service';
import { catchError, of } from 'rxjs';
import { Gender } from 'src/enumerations';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-names-detail',
  templateUrl: './names-detail.component.html',
  styleUrls: ['./names-detail.component.scss'],
})
export class NamesDetailComponent {
  public Editor = ClassicEditor;
  loading = true;
  gender: Gender[] = Object.values(Gender);
  
  form: FormGroup = new FormGroup({});

  get id() {
    return this.route.snapshot.params['id'];
  }

  constructor(
    private _nameSrv: NamesService,
    private nzMessageService: NzMessageService,
    private router: Router,
    private route: ActivatedRoute,
    imageSrv: ImageService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      explanation: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
    });

    if (this.id) {
      this._nameSrv.getById(this.id).subscribe((item) => {
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
    this._nameSrv
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
        this.router.navigate(['/', 'names']);
      });
  }

  update(id: string) {
    this._nameSrv
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
        this.router.navigate(['/', 'names']);
      });
  }
}
