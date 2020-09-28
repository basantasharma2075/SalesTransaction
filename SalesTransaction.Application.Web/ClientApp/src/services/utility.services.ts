import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private snackbar: MatSnackBar) { }


  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, 'close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: [action]
    });
  }

}