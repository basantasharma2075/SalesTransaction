import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { MvNewProduct } from './../product.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit , AfterViewInit{

  productForm: FormGroup;
  action: string;
  selectedProduct: MvNewProduct = <MvNewProduct>{};


  
  constructor(public fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { 
      dialogRef.disableClose = true;
      this.action = data.action;
      this.selectedProduct = data.data || {};
    }
    ngOnInit(): void {
      this.productForm = this.fb.group({
        ProductName: ['', Validators.required],
        ProductQuantity: ['', Validators.required],
        RemainingQuantity: ['', Validators.required],
        ProductExpiryDate: ['', [Validators.required]],
        ProductBarCode: ['', [Validators.required]],
        ProductRate: ['', [Validators.required]],
        StartDate: ['', [Validators.required]],
        EndDate: ['', [Validators.required]],
        ProductOffer: ['', [Validators.required]]
      });
    }

    onSubmit(){
      this.dialogRef.close(this.selectedProduct);
    }
    onClose(){
      this.dialogRef.close();
    }
  
    ngAfterViewInit() {
      this.productForm.updateValueAndValidity();
    }
  
  }