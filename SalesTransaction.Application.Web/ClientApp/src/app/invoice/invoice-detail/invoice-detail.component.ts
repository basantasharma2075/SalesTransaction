import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MvInvoice, MvInvoiceDetail } from '../invoice.model';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss']
})
export class InvoiceDetailComponent implements OnInit {
  invoiceDetail: MvInvoiceDetail[] = [];
  invoice: MvInvoice = {} as MvInvoice;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<InvoiceDetailComponent>
  ) {
    this.dialogRef.disableClose = true;
    this.invoiceDetail = this.data.invoiceDetail;
    this.invoice = this.data.invoice;
  }

  ngOnInit(): void {
  }

  cancelClick(): void {
    this.dialogRef.close('close');
  }

  printInvoice(): void {
    this.dialogRef.close('print');
  }


}