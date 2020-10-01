// import { Component, Inject, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

// import { MvCustomer } from 'src/app/customer/customer.model';
// import { CustomerService } from 'src/app/customer/customer.service';
// import { MvProduct } from 'src/app/product/product.model';
// import { ProductService } from 'src/app/product/product.service';
// import { MvSales } from '../sales.model';

// @Component({
//   selector: 'app-sales-form',
//   templateUrl: './sales-form.component.html',
//   styleUrls: ['./sales-form.component.scss']
// })

// export class SalesFormComponent implements OnInit {
//   salesForm: FormGroup;
//   customers = [];
//   products = [];
//   action: string;
//   sale: MvSales = {} as MvSales;

//   constructor(
//     @Inject(MAT_DIALOG_DATA) public data: any,
//     private fb: FormBuilder,
//     public dialogRef: MatDialogRef<SalesFormComponent>,
//     private ps: ProductService,
//     private cs: CustomerService,
//   ) {
//     this.action = data.action;
//     this.sale = data.data || {};
//     dialogRef.disableClose = true;
//   }

//   ngOnInit(): void {
//     this.salesForm = this.fb.group({
//       CustomerId: [this.sale.CustomerId, Validators.required],
//       ProductId: [this.sale.ProductId, Validators.required],
//       Quantity: [this.sale.Quantity, Validators.required],
      
//     });
//     this.fetchCustomers();
//     this.fetchProducts();

//   }

//   fetchCustomers(): void{
//     this.cs.getAllCustomerDetail().subscribe(res => {
//       if (res && res.data){
//         res.data.forEach(item => {
//           if (item.CustomerId){
//             this.customers.push({
//               value: item.CustomerId,
//               viewValue: `${item.CustomerName}`
//             });
//           }
//         });
//       }
//     }, err => console.log(err));
//   }

//   fetchProducts(): void{
//     this.ps.getAllProductDetail().subscribe(res => {
//       if (res && res.data){
//         res.data.forEach(item => {
//           if (item.ProductId){
//             this.products.push({
//               value: item.ProductId,
//               viewValue: item.ProductName
//             });
//           }
//         });
//       }
//     }, err => console.log(err));
//   }

//   cancelClick(): void{
//     this.dialogRef.close();
//   }

//   submitForm(): void{
//     this.sale.CustomerId = this.salesForm.get('CustomerId').value;
//     this.sale.ProductId = this.salesForm.get('ProductId').value;
//     this.sale.Quantity = this.salesForm.get('Quantity').value;
//     this.dialogRef.close(this.sale);
//   }

// }

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MvCustomer } from 'src/app/customer/customer.model';
import { CustomerService } from 'src/app/customer/customer.service';
import { MvProduct } from 'src/app/product/product.model';
import { ProductService } from 'src/app/product/product.service';
//import { UtilityService } from 'src/core/services/utility.service';
import { MvSales } from '../sales.model';

@Component({
  selector: 'app-sales-form',
  templateUrl: './sales-form.component.html',
  styleUrls: ['./sales-form.component.scss']
})
export class SalesFormComponent implements OnInit {
  salesForm: FormGroup;
  customers = [];
  products = [];
  action: string;
  saleTransaction: MvSales = {} as MvSales;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SalesFormComponent>,
    private ps: ProductService,
    private cs: CustomerService,
  ) {
    this.action = data.action;
    this.saleTransaction = data.data || {};
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.salesForm = this.fb.group({
      CustomerId: [this.saleTransaction.CustomerId, Validators.required],
      ProductId: [this.saleTransaction.ProductId, Validators.required],
      Quantity: [this.saleTransaction.Quantity, Validators.required],
    });
    this.fetchCustomers();
    this.fetchProducts();

  }

  fetchCustomers(): void {
    this.cs.getAllCustomerDetail().subscribe(res => {
      if (res && res.data) {
        res.data.forEach(item => {
          if (item.CustomerId) {
            this.customers.push({
              value: item.CustomerId,
              viewValue: `${item.CustomerName}`
            });
          }
        });
      }
    }, err => console.log(err));
  }

  fetchProducts(): void {
    this.ps.getAllProductDetail().subscribe(res => {
      if (res && res.data) {
        res.data.forEach(item => {
          if (item.ProductId) {
            this.products.push({
              value: item.ProductId,
              viewValue: item.ProductName
            });
          }
        });
      }
    }, err => console.log(err));
  }

  cancelClick(): void {
    this.dialogRef.close();
  }

  submitForm(): void {
    this.saleTransaction.CustomerId = this.salesForm.get('CustomerId').value;
    this.saleTransaction.ProductId = this.salesForm.get('ProductId').value;
    this.saleTransaction.Quantity = this.salesForm.get('Quantity').value;
    this.dialogRef.close(this.saleTransaction);
  }

}