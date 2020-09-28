import { LoginService } from './login.service';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MvLogin } from './login.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {

    loginForm: FormGroup;
    errorMessage: any;
  login: MvLogin = <MvLogin>{};

  constructor(public formBuilder: FormBuilder, 
    public loginService: LoginService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {

  }

  ngOnInit() {

    /*, CustomValidationService.passwordValidator*/
    this.loginForm = this.formBuilder.group({
      UserName: ['', Validators.required],
      LoginPassword: ['', [Validators.required]]
    });
  }

  submitForm() { // call server/api and authenticate

    this.errorMessage = null;

    if (this.loginForm.valid) {
      this.login.UserName = this.loginForm.get('UserName').value.trim();
      this.login.LoginPassword = this.loginForm.get('LoginPassword').value.trim();

      this.loginService.getLogin(this.login).subscribe((response: any) => {

        if (response) {
          console.log(response);
          localStorage.setItem('PersonId', response.PersonId);
          this.openSnackBar('Successful login !', 'Dismiss');
         this.router.navigate(['/user-detail']);
        } else {

          this.errorMessage = 'Invalid User Name or Login';
        }
      });
    } else {

      this.errorMessage = 'Invalid Form';
    }
  }

  openSnackBar(message, action) {

    this.snackBar.open(message, action, {
      duration: 5000, // in milli-seconds
      panelClass: [action],
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  ngAfterViewInit() {

    this.loginForm.updateValueAndValidity();
  }

  ngOnDestroy() {

  }
}
