import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Observable, catchError, of } from 'rxjs';
import { BaseImageUpload } from 'src/app/base/components/base-upload-image';
import { ITraining } from 'src/interfaces';
import { TrainingService } from '../../service/training.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from 'src/app/shared/services/image.service';

@Component({
  selector: 'app-training-detail',
  templateUrl: './training-detail.component.html',
  styleUrls: ['./training-detail.component.scss']
})
export class TrainingDetailComponent extends BaseImageUpload {
  public Editor = ClassicEditor;
  training: Observable<ITraining[]> = of([]);
  loading = true;
  form: FormGroup = new FormGroup({});

  get id() {
    return this.route.snapshot.params['id'];
  }

  constructor(
    private _trainingSrv: TrainingService,
    private nzMessageService: NzMessageService,
    private router: Router,
    private route: ActivatedRoute,
    imageSrv: ImageService
  ) {
    super(imageSrv);
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      descr: new FormControl('', [Validators.required]),
    });

    if (this.id) {
      this._trainingSrv.getById(this.id).subscribe((item) => {
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

    this.training = this._trainingSrv.getAll();
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
    this._trainingSrv
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
        this.router.navigate(['/', 'training']);
      });
  }

  update(id: string) {
    this._trainingSrv
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
        this.router.navigate(['/', 'training']);
      });
  }
}
