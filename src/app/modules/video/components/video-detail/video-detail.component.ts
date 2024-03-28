import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BaseImageUpload } from 'src/app/base/components/base-upload-image';
import { VideoService } from '../../service/video.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from 'src/app/shared/services/image.service';
import { Observable, catchError, of } from 'rxjs';
import { PlaylistService } from 'src/app/modules/playlist/service/playlist.service';
import { IPlaylist } from 'src/interfaces';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.scss']
})
export class VideoDetailComponent extends BaseImageUpload {
  public Editor = ClassicEditor;

  playlist:Observable<IPlaylist[]> = of([]);
  loading = true;
  form: FormGroup = new FormGroup({});
  
  get id() {
    return this.route.snapshot.params['id'];
  }
  
  constructor(
    private _videoSrv: VideoService,
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
      video: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      descr: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      playlistId: new FormControl('', [Validators.required]),
    });

    if (this.id) {
      this._videoSrv.getById(this.id).subscribe((item) => {
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

    this.playlist = this._playlistSrv.getAll()
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
    this._videoSrv
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
        this.router.navigate(['/', 'video']);
      });
  }

  update(id: string) {
    this._videoSrv
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
        this.router.navigate(['/', 'video']);
      });
  }
}
