// import { Component, OnInit } from '@angular/core';
// import { MvSales, MvNewSales } from './sales.model';
// import { SalesService } from './sales.service';
// import { MatTableDataSource } from '@angular/material/table';
// import { SelectionModel } from '@angular/cdk/collections';
// import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { SalesFormComponent } from './sales-form/sales-form.component';
// //import { UtilityService } from '../../services/utility.services';


// @Component({
//   selector: 'app-sales',
//   templateUrl: './sales.component.html',
//   styleUrls: ['./sales.component.scss']
// })
// export class SalesComponent implements OnInit {
//   userMessage = '';
//   displayedColumns: string[];
//   dataSource: MatTableDataSource<MvSales>;
//   selectedSales: MvNewSales = <MvNewSales>{};
//   selection = new SelectionModel<MvSales>(false, []);

//   constructor(
//     private salesService: SalesService,
//     private dialog: MatDialog
//   ) { }

//   ngOnInit(): void {
//     this.displayedColumns = ['SalesTransactionId', 'CustomerId', 'ProductId', 'InvoiceId'
//   ];
//     this.getAllSaless();
//   }
//   getAllSaless() {
//     this.salesService.getAllSalesDetail().subscribe((response: any) => {
//       if (response && response.data) {
//         this.dataSource = new MatTableDataSource<MvSales>(response.data);
//       } else {
//         this.dataSource = new MatTableDataSource<MvSales>();;
//         this.userMessage = 'No Customer available !';
//       }
//     });

//   }

//   addSales(){
//     this.selection.clear();
//     this.selectedSales = <MvSales>{};
//     this.openDialog('Add');
//   }

//   editSales(){
//     this.openDialog('Edit');
//   }

//   openDialog(action: string){
//     if (action === 'Edit' && !this.selection.hasValue()){
//   //    this.userMessage='Please Select Row first', 'warn';
//   //this.utilityService.openSnackBar('Please Select Row first', 'warn');
//       return;
//     }

//     const dialogRef = this.dialog.open(SalesFormComponent, {
//       data: {
//         action,
//         data: this.selectedSales
//       }
 
//      });
 

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         if (action === 'Edit'){
//           this.salesService.updateSales(result).subscribe(res => {
//      //       this.utilityService.openSnackBar('Product Edited', 'success');
//             this.getAllSaless();
//           });

//         } else {
//           this.salesService.addSales(result).subscribe(res => {
//        //     this.utilityService.openSnackBar('Product added successfully', 'success');
//             this.getAllSaless();
//           });
//         }
//       }

//     });
//   }

//   selectRow(e: any, row: MvSales) {
//     this.selectedSales = { ...row };
//     this.selection.toggle(row);
//   }







// }
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
//import { UtilityService } from 'src/core/services/utility.service';
import { InvoiceService } from '../invoice/invoice.service';
import { SalesFormComponent } from './sales-form/sales-form.component';
import { MvSales } from './sales.model';
import { SalesService } from './sales.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  userMsg: string = null;
  displayedColumns: string[];
  dataSource: MvSales[] = [];
  selectedSale: MvSales = {} as MvSales;
  selection = new SelectionModel<MvSales>(false, []);
  selectionCheckBox = new SelectionModel<MvSales>(true, []);


  constructor(
    private ss: SalesService,
    private dialog: MatDialog,
    //private us: UtilityService,
    private is: InvoiceService
  ) { }

  ngOnInit(): void {
    this.displayedColumns = ['select', 'SalesTransactionId', 'ProductName', 'CustomerName', 'Quantity', 'Rate', 'InvoiceId','SubTotal', 'Discount', 'Total'];
    this.getAllSalesTransactionDetail();
  }

  getAllSalesTransactionDetail(): void {
    this.ss.getAllSalesDetail().subscribe(res => {
      if (res && res.data) {
        this.dataSource = res.data;
      } else {
        this.dataSource = [];
        this.userMsg = 'No data';
      }
    }, err => console.log(err));
  }

  addSalesTransaction(): void {
    this.selection.clear();
    this.selectedSale = {} as MvSales;
    this.openDialog('Add');
  }
  editSalesTransaction(): void {
    this.openDialog('Edit');
  }

  openDialog(action: string): void {
    if (action === 'Edit' && !this.selection.hasValue()) {
      //this.us.openSnackBar('Select a sale before editing', 'warning');
      return;
    }
    const dialogRef = this.dialog.open(SalesFormComponent, {
     data: {
       action,
       data: this.selectedSale
     }

    });

    dialogRef.afterClosed().subscribe(saleTransaction => {
      if (saleTransaction) {
        if (action === 'Edit') {
          this.ss.updateSales(saleTransaction).subscribe(res => {
            this.getAllSalesTransactionDetail();
           // this.us.openSnackBar('SaleTransaction Updated', 'success');
          });
        } else {
          this.ss.addSales(saleTransaction).subscribe(res => {
            this.getAllSalesTransactionDetail();
           // this.us.openSnackBar('SaleTransaction Added', 'success');
          }, err => console.log(err));
        }
      }
    });
  }

  onRowClicked(row: any): void {
    this.selectedSale = { ...row };
    this.selection.toggle(row);
    this.selectionCheckBox.toggle(row);
  }

  isAllSelected(): boolean {
    const numSelected = this.selectionCheckBox.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(): void {
    this.isAllSelected() ?
        this.selectionCheckBox.clear() :
        this.dataSource.forEach(row => this.selectionCheckBox.select(row));
  }

  generateInvoice(): void {
    if (!this.selectionCheckBox.hasValue()) {
 //     this.us.openSnackBar('Select salestransaction to generate invoice', 'warning');
    } else {
      if (this.isInvoiced(this.selectionCheckBox.selected)) {
   //     this.us.openSnackBar('Cannot generate invoice for an invoiced sale', 'warning');
      } else if (!this.hasSameCustomer(this.selectionCheckBox.selected)) {
     //   this.us.openSnackBar('Please select salestransaction with same customer', 'warning');
      } else {
        this.is.addInvoice(this.selectionCheckBox.selected).subscribe(res => {
       //   this.us.openSnackBar('Invoice Generated', 'success');
          this.getAllSalesTransactionDetail();
        }, err => console.log(err));
      }
    }
  }

  hasSameCustomer(array): boolean {
    const first = array[0];
    return array.every((element) => {
        return element.customerId === first.customerId;
    });
  }

  isInvoiced(array): boolean {
    let res = false;
    array.forEach(item => {
      if (item.invoiceId) {
        res = true;
        return;
      }
    });
    return res;
  }
}