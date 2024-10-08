import { NgModule } from "@angular/core";
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NgxPermissionsModule } from "ngx-permissions";

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgxPermissionsModule.forChild(),


        NzTableModule,
        NzDividerModule,
        NzIconModule,
        NzButtonModule,
        NzPopconfirmModule,
        NzInputModule,
        NzFormModule,
        NzSelectModule,
        NzSpinModule,
        NzDropDownModule,
        NzInputNumberModule,
        NzImageModule
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        NgxPermissionsModule,

        NzTableModule,
        NzDividerModule,
        NzIconModule,
        NzButtonModule,
        NzPopconfirmModule,
        NzInputModule,
        NzFormModule,
        NzSelectModule,
        NzSpinModule,
        NzDropDownModule,
        NzInputNumberModule,
        NzImageModule

    ]
})
export class BaseModule { }
