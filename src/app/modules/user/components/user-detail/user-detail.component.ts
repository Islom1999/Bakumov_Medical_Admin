import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/interfaces';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  @Input()
  id!: string;
  user!:IUser

  constructor(
    private _service: UserService,
  ){}

  ngOnInit(): void {
    this._service.getById(this.id).subscribe(data => {
      this.user = data
    })
  }
}
