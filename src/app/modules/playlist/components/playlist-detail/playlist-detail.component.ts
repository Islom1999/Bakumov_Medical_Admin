import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ImageUploadComponent } from 'src/app/shared/components';
import { RoleType } from 'src/enumerations';
import { PlaylistService } from '../../service/playlist.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from 'src/app/shared/services/image.service';
import { catchError, of } from 'rxjs';
import { BaseImageUpload } from 'src/app/base/components/base-upload-image';
import { ServiceType } from 'src/enumerations/serviceType';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.scss']
})
export class PlaylistDetailComponent extends BaseImageUpload {
  public Editor = ClassicEditor;

  roleTypes: RoleType[] = Object.values(RoleType);
  serviceType: ServiceType[] = Object.values(ServiceType);
  loading = true;
  listOfSelectedValue = [];
  form: FormGroup = new FormGroup({});
  
  get id() {
    return this.route.snapshot.params['id'];
  }
  
  constructor(
    private _playlistSrv: PlaylistService,
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
      serviceType: new FormControl('', [Validators.required]),
      roleType: new FormControl('', [Validators.required]),
    });

    if (this.id) {
      this._playlistSrv.getById(this.id).subscribe((item) => {
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
    this._playlistSrv
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
        this.router.navigate(['/', 'playlist']);
      });
  }

  update(id: string) {
    this._playlistSrv
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
        this.router.navigate(['/', 'playlist']);
      });
  }

}
