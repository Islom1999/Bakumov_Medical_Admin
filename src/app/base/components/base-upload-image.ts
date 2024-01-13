import { NzMessageService } from 'ng-zorro-antd/message';
import { Component, Injectable, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { BaseApiService } from '../services/base-api.service';
import { ImageService } from 'src/app/shared/services/image.service';

@Component({
  template: '',
})
export abstract class BaseImageUpload{
  loadingImage = true;
  imgNotFound = '/assets/images/no-image.jpg';
  imgUrl = 'Error';
  image!: string;
  disableBtn = true;


  constructor(
    protected imageSrv: ImageService
  ) {}

  openUpload(fileInput: HTMLInputElement) {
    fileInput.click();
  }

  uploadImage(event: File) {
    this.loadingImage = true;
    this.imageSrv
      .uploadImage(event)
      .pipe(
        tap((image) => {
          this.imgUrl = image.url;
          this.image = image.filename;
          this.loadingImage = false;
          this.disableBtn = false;
        })
      )
      .subscribe();
  }

  removeImage() {
    this.loadingImage = true;
    this.imgUrl = 'Error';
    this.image = '';
    this.loadingImage = false;
    this.disableBtn = true;
  }

  getImageUrl(url: string): string {
    return this.imageSrv.getImageUrl(url);
  }
}
