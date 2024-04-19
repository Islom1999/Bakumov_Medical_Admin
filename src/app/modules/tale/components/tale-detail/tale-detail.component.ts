import { Component } from '@angular/core';
import { TaleService } from '../../service/tale.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, catchError, of } from 'rxjs';
import { ImageService } from 'src/app/shared/services/image.service';
import { BaseImageUpload } from 'src/app/base/components/base-upload-image';
import { ITale } from 'src/interfaces';

@Component({
  selector: 'app-tale-detail',
  templateUrl: './tale-detail.component.html',
  styleUrls: ['./tale-detail.component.scss']
})
export class TaleDetailComponent extends BaseImageUpload {
  public Editor = ClassicEditor;
  tale: Observable<ITale[]> = of([]);
  loading = true;
  form: FormGroup = new FormGroup({});

  get id() {
    return this.route.snapshot.params['id'];
  }

  constructor(
    private _taleSrv: TaleService,
    private nzMessageService: NzMessageService,
    private router: Router,
    private route: ActivatedRoute,
    imageSrv: ImageService
  ) {
    super(imageSrv);
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      descr: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
    });

    if (this.id) {
      this._taleSrv.getById(this.id).subscribe((item) => {
        this.form.patchValue(item);
        this.disableBtn = false;
        this.loading = false;
        this.imgUrl = this.getImageUrl(item.image);
        this.image = item.image;
        this.loadingImage = false;
      });
    } else {
      this.loading = false;
      this.loadingImage = false;
      this.disableBtn = true;
    }

    this.tale = this._taleSrv.getAll();
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
    this._taleSrv
      .create({ ...this.form.value, image: this.image })
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
        this.router.navigate(['/', 'tale']);
      });
  }

  update(id: string) {
    this._taleSrv
      .update(id, { ...this.form.value, image: this.image })
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
        this.router.navigate(['/', 'tale']);
      });
  }
}
