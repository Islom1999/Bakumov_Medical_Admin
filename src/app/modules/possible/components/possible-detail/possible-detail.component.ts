import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PossibleService } from '../../service/possible.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-possible-detail',
  templateUrl: './possible-detail.component.html',
  styleUrls: ['./possible-detail.component.scss']
})
export class PossibleDetailComponent {
  loading = true;
  disableBtn = true;

  form: FormGroup = new FormGroup({});

  get id() {
    return this.route.snapshot.params['id']
  }

  constructor(
    private _possibleSrv: PossibleService,
    private nzMessageService: NzMessageService,
    private router: Router,
    private route: ActivatedRoute,
  ){}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
    }); 
    if(this.id){
      this._possibleSrv.getById(this.id).subscribe((data) => {
        this.form.patchValue(data);
        this.disableBtn = false
        this.loading = false
      })
    }else{
      this.loading = false
      this.disableBtn = false
    }   
  }

  submit(){
    if(this.form.valid){
      this.disableBtn = true
      if(this.id){
        this.update(this.id)
      }else{
        this.create()
      }
      
    }else{
      Object.values(this.form.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  create(){
    this._possibleSrv.create(this.form.value)
    .pipe(
      catchError( ({error}) => {
        if(error?.statusCode == 409)
          this.nzMessageService.error(error?.message)
        this.disableBtn = false
        return of()
      } )
    )
    .subscribe(() => {
      this.nzMessageService.success('Create data')
      this.router.navigate(['/', 'possible'])
    })
  }

  update(id:string){
    this._possibleSrv.update(id, this.form.value)
    .pipe(
      catchError( ({error}) => {
        if(error?.statusCode == 409)
          this.nzMessageService.error(error?.message)
        this.disableBtn = false
        return of()
      } )
    )
    .subscribe(() => {
      this.nzMessageService.success('Update data')
      this.router.navigate(['/', 'possible'])
    })
  }
}
