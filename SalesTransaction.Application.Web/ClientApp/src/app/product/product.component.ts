import { Component, OnInit } from '@angular/core';
import { MvProduct, MvNewProduct } from './product.model';
import { ProductService } from './product.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductFormComponent } from './product-form/product-form.component';
//import { UtilityService } from '../../services/utility.services';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  userMessage = '';
  displayedColumns: string[];
  dataSource: MatTableDataSource<MvProduct>;
  selectedProduct: MvNewProduct = <MvNewProduct>{};
  selection = new SelectionModel<MvProduct>(false, []);

  constructor(
    private productService: ProductService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.displayedColumns = ['ProductId', 'ProductName', 'ProductQuantity', 'RemainingQuantity',
      'ProductExpiryDate', 'ProductBarCode', 'ProductRate', 'StartDate', 'EndDate', 'ProductOffer'
  ];
    this.getAllProducts();
  }
  getAllProducts() {
    this.productService.getAllProductDetail().subscribe((response: any) => {
      if (response && response.data) {
        this.dataSource = new MatTableDataSource<MvProduct>(response.data);
      } else {
        this.dataSource = new MatTableDataSource<MvProduct>();;
        this.userMessage = 'No product available !';
      }
    });

  }

  addProduct(){
    this.selection.clear();
    this.selectedProduct = <MvProduct>{};
    this.openDialog('Add');
  }

  editProduct(){
    this.openDialog('Edit');
  }

  openDialog(action: string){
    if (action === 'Edit' && !this.selection.hasValue()){
  //    this.userMessage='Please Select Row first', 'warn';
  //this.utilityService.openSnackBar('Please Select Row first', 'warn');
      return;
    }

    // const dialogRef = this.dialog.open(ProductFormComponent, {
    //   data: {
    //     action,
    //     data: this.selectedProduct
    //   }
 
    //  });

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '25%';
    dialogConfig.panelClass = 'mat-form-dialog';
    dialogConfig.data = { data: this.selectedProduct, action: action };
    const dialogRef = this.dialog.open(ProductFormComponent, dialogConfig);


 

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (action === 'Edit'){
          this.productService.updateProduct(result).subscribe(res => {
     //       this.utilityService.openSnackBar('Product Edited', 'success');
            this.getAllProducts();
          });

        } else {
          this.productService.addProduct(result).subscribe(res => {
       //     this.utilityService.openSnackBar('Product added successfully', 'success');
            this.getAllProducts();
          });
        }
      }

    });
  }

 selectRow(e: any, row: MvProduct) {
    this.selectedProduct = { ...row };
    this.selection.toggle(row);
  }





}
