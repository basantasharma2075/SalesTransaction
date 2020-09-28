import { Component, OnInit } from '@angular/core';
import { MvCustomer, MvNewCustomer } from './customer.model';
import { CustomerService } from './customer.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerFormComponent } from './customer-form/customer-form.component';
//import { UtilityService } from '../../services/utility.services';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  userMessage = '';
  displayedColumns: string[];
  dataSource: MatTableDataSource<MvCustomer>;
  selectedCustomer: MvNewCustomer = <MvNewCustomer>{};
  selection = new SelectionModel<MvCustomer>(false, []);

  constructor(
    private customerService: CustomerService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.displayedColumns = ['CustomerId', 'CustomerName', 'CustomerEmail', 'Address'
  ];
    this.getAllCustomers();
  }
  getAllCustomers() {
    this.customerService.getAllCustomerDetail().subscribe((response: any) => {
      if (response && response.data) {
        this.dataSource = new MatTableDataSource<MvCustomer>(response.data);
      } else {
        this.dataSource = new MatTableDataSource<MvCustomer>();;
        this.userMessage = 'No Customer available !';
      }
    });

  }

  addCustomer(){
    this.selection.clear();
    this.selectedCustomer = <MvCustomer>{};
    this.openDialog('Add');
  }

  editCustomer(){
    this.openDialog('Edit');
  }

  openDialog(action: string){
    if (action === 'Edit' && !this.selection.hasValue()){
  //    this.userMessage='Please Select Row first', 'warn';
  //this.utilityService.openSnackBar('Please Select Row first', 'warn');
      return;
    }

    const dialogRef = this.dialog.open(CustomerFormComponent, {
      data: {
        action,
        data: this.selectedCustomer
      }
 
     });
 

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (action === 'Edit'){
          this.customerService.updateCustomer(result).subscribe(res => {
     //       this.utilityService.openSnackBar('Product Edited', 'success');
            this.getAllCustomers();
          });

        } else {
          this.customerService.addCustomer(result).subscribe(res => {
       //     this.utilityService.openSnackBar('Product added successfully', 'success');
            this.getAllCustomers();
          });
        }
      }

    });
  }

  onRowClicked(row: any): void{
    this.selectedCustomer = { ...row };
    this.selection.toggle(row);
  }






}
