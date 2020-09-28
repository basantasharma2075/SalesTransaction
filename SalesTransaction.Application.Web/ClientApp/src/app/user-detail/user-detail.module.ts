import { HttpClientModule } from '@angular/common/http';
//import { MaterialModule } from './../shared/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailComponent } from './user-detail.component';
import { UserDetailService } from './user-detail.service';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  {
    path: '', component: UserDetailComponent
  }
];

@NgModule({
  declarations: [
    UserDetailComponent
  ],

  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatButtonModule,
   // MaterialModule,
    HttpClientModule
  ],
  
  providers: [
    UserDetailService
  ],
  exports: [
    UserDetailComponent
  ]
})
export class UserDetailModule {

}
