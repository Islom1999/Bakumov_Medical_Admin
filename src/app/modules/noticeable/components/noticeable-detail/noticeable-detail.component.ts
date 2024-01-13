import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BaseImageUpload } from 'src/app/base/components/base-upload-image';
import { RoleType } from 'src/enumerations';
import { NoticeableService } from '../../service/noticeable.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from 'src/app/shared/services/image.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-noticeable-detail',
  templateUrl: './noticeable-detail.component.html',
  styleUrls: ['./noticeable-detail.component.scss']
})
export class NoticeableDetailComponent extends BaseImageUpload {
  roleTypes: RoleType[] = Object.values(RoleType);
  loading = true;
  form: FormGroup = new FormGroup({});
  
  get id() {
    return this.route.snapshot.params['id'];
  }
  
  constructor(
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
      name: new FormControl('', [Validators.required]),
      roleType: new FormControl('', [Validators.required]),
    });

    if (this.id) {
      this._noticeableSrv.getById(this.id).subscribe((item) => {
        this.form.patchValue(item);
        this.disableBtn = false;
        this.loading = false
        this.imgUrl = this.getImageUrl(item.icon)
        this.image = item.icon
        this.loadingImage = false
      });
    } else {
      this.loading = false
      this.loadingImage = false;
      this.disableBtn = true;
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
    this._noticeableSrv
      .create({...this.form.value, icon: this.image})
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
        this.router.navigate(['/', 'noticeable']);
      });
  }

  update(id: string) {
    this._noticeableSrv
      .update(id, {...this.form.value, icon: this.image})
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
        this.router.navigate(['/', 'noticeable']);
      });
  }
}
