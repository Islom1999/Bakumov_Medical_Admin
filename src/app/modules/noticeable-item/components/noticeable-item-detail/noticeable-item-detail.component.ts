import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, catchError, of, tap } from 'rxjs';
import { BaseImageUpload } from 'src/app/base/components/base-upload-image';
import { NoticeableItemService } from '../../service/noticeable-item.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from 'src/app/shared/services/image.service';
import { NoticeableService } from 'src/app/modules/noticeable/service/noticeable.service';
import { INoticeable } from 'src/interfaces';
import { Trim } from 'src/enumerations';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-noticeable-item-detail',
  templateUrl: './noticeable-item-detail.component.html',
  styleUrls: ['./noticeable-item-detail.component.scss']
})
export class NoticeableItemDetailComponent extends BaseImageUpload {
  public Editor = ClassicEditor;
  trim: Trim[] = Object.values(Trim);
  noticeable: Observable<INoticeable[]> = of([]);
  loading = true;
  form: FormGroup = new FormGroup({});
  
  get id() {
    return this.route.snapshot.params['id'];
  }
  
  constructor(
    private _noticeableItemSrv: NoticeableItemService,
    private _noticeableSrv: NoticeableService,
    private nzMessageService: NzMessageService,
    private router: Router,
    private route: ActivatedRoute,
    imageSrv: ImageService
  ) {
    super(imageSrv)
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      descr: new FormControl('', [Validators.required]),
      trim: new FormControl('', [Validators.required]),
      noticeableId: new FormControl('', [Validators.required]),
    });

    if (this.id) {
      this._noticeableItemSrv.getById(this.id).subscribe((item) => {
        this.form.patchValue(item);
        this.disableBtn = false;
        this.loading = false
        this.imgUrl = this.getImageUrl(item.image)
        this.image = item.image
        this.loadingImage = false
      });
    } else {
      this.loading = false
      this.loadingImage = false;
      this.disableBtn = true;
    }

    this.noticeable = this._noticeableSrv.getAll()
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
    this._noticeableItemSrv
      .create({...this.form.value, image: this.image})
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
        this.router.navigate(['/', 'noticeable-item']);
      });
  }

  update(id: string) {
    this._noticeableItemSrv
      .update(id, {...this.form.value, image: this.image})
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
        this.router.navigate(['/', 'noticeable-item']);
      });
  }
}
