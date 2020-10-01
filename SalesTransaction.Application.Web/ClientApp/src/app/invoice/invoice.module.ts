import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceComponent } from './invoice.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { MaterialModule } from '../shared/material.module';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { CdkTableModule } from '@angular/cdk/table';
import { InvoiceService } from './invoice.service';

const routes: Routes = [
  {
    path: '',
    component: InvoiceComponent
  }
];

@NgModule({
  declarations: [
    InvoiceComponent,
    [InvoiceDetailComponent]
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatFormFieldModule,
    HttpClientModule,
    ReactiveFormsModule,
    CdkTableModule,
    MaterialModule,
    MatDialogModule
  ],
  exports: [
    InvoiceComponent
  ],
  providers: [
    InvoiceService
  ]
})
export class InvoiceModule { }