// //import { UtilityService } from './../../core/services/utility.service';
// import { MatTableDataSource } from '@angular/material/table';
// import { Component, OnInit } from '@angular/core';
// import { InvoiceService } from './invoice.service';
// import { MvInvoiceDetail, MvInvoiceDescription } from './invoice.model';
// import { SelectionModel } from '@angular/cdk/collections';
// import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
// import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';

// @Component({
//   selector: 'app-invoice',
//   templateUrl: './invoice.component.html',
//   styleUrls: ['./invoice.component.scss']
// })
// export class InvoiceComponent implements OnInit {

//   displayedColumns: string[];
//   dataSource: MatTableDataSource<MvInvoiceDetail>;
//   errorMessage = '';
//   selectedInvoice: MvInvoiceDetail = <MvInvoiceDetail>{};
//   invoiceDescription: MvInvoiceDescription = <MvInvoiceDescription>{};
//   selection = new SelectionModel<MvInvoiceDetail>(false, []);

//   constructor(
//     private invoiceService: InvoiceService,
//     private dialog: MatDialog,
//     //private utilityService: UtilityService
//     ) { }

//   ngOnInit(): void {
//     this.displayedColumns = ['invoiceId', 'customerName', 'subTotal', 'Total', 'insertDate']
//     this.getAllInvoice();
//   }

//   getAllInvoice(){
//     this.invoiceService.getAllInvoiceDetail().subscribe((response: any) => {
//       if (response && response.data) {
//         this.dataSource = new MatTableDataSource<MvInvoiceDetail>(response.data);
//       } else {
//         this.dataSource = new MatTableDataSource<MvInvoiceDetail>();
//         this.errorMessage = 'No Data';
//       }
//     });
//   }

//   onGenerate(){
//     if (!this.selection.hasValue()){
// //      this.utilityService.openSnackBar('Please select an invoice to get the details', 'warn');
//       return;
//     }
//     this.invoiceService.getInvoiceDescription(this.selectedInvoice.invoiceId).subscribe(response => {
//       // this.invoiceDescription = response;
//       // console.log(this.invoiceDescription);
//       this.openDialog(response);
//     });
//   }

//   openDialog(salesData){
//     const dialogConfig = new MatDialogConfig();
//     dialogConfig.disableClose = true;
//     dialogConfig.autoFocus = true;
//     dialogConfig.width = '80%';
//     dialogConfig.panelClass = 'mat-form-dialog';
//     dialogConfig.data = {
//         invoice: this.selectedInvoice,
//         invoiceDescription: salesData
//     };
//     const dialogRef = this.dialog.open(InvoiceDetailComponent, dialogConfig);

//     dialogRef.afterClosed().subscribe(action => {
//       if (action === 'close'){
//   //      this.utilityService.openSnackBar('Operation closed', 'warn');
//       } else if (action === 'print'){
//    //     this.utilityService.openSnackBar('Invoice printed successfully', 'success');
//       }
//     });

//   }




//   selectRow(e: any, row: MvInvoiceDetail){
//     this.selectedInvoice = {...row};
//     this.selection.toggle(row);
//   }

// }


import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MvInvoice, MvInvoiceDetail } from 'src/app/invoice/invoice.model';
import { InvoiceService } from 'src/app/invoice/invoice.service';
//import { UtilityService } from 'src/core/services/utility.service';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  userMsg: string = null;
  displayedColumns: string[];
  dataSource: MvInvoice[] = [];
  selectedInvoice: MvInvoice = {} as MvInvoice;
  selection = new SelectionModel<MvInvoice>(false, []);
  invoiceDetail: MvInvoiceDetail[] = [];

  constructor(
    private is: InvoiceService,
  //  private us: UtilityService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.displayedColumns = ['invoiceId', 'customerName', 'subTotal', 'Total', 'insertDate'];
    this.getAllInvoice();
  }

  getAllInvoice(): void{
    this.is.getAllInvoiceDetail().subscribe(res => {
      if (res && res.data){
        this.dataSource = res.data;
      } else {
        this.dataSource = [];
        this.userMsg = 'No data';
      }
    }, err => console.log(err));

  }

  onRowClicked(row: any): void{
    this.selectedInvoice = { ...row };
    this.selection.toggle(row);
  }

  getInvoiceDetail(): void{
    if (!this.selection.hasValue()){
//      this.us.openSnackBar('Please select an invoice to view details', 'warning');
    }
    else {
      this.is.getInvoiceDescription(this.selectedInvoice.invoiceId).subscribe(res => {
        if (res && res.data){
          this.invoiceDetail = res.data;

          const dialogRef = this.dialog.open(InvoiceDetailComponent, {
            width: '800px',
            height: '500px',
            data: {
              invoice: this.selectedInvoice,
              invoiceDetail: this.invoiceDetail
            }
          });

          dialogRef.afterClosed().subscribe(message => {
            if (message === 'print'){
           //   this.us.openSnackBar('Invoice Printed Successfully', 'success');
            }
            else if (message === 'close'){
             // this.us.openSnackBar('Action Cancelled', 'warning');
            }
          });
        }
      });
    }
  }


}