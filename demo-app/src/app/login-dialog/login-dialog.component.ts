import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required)
  });

  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(user => {
        if (user && user.isAdmin && user.token) {
          this.snackBar.open('Logged In Successfully !', 'OK', { duration: 3000 });
          this.dialogRef.close();
        }
        else {
          this.snackBar.open('User does not exist !', 'OK', { duration: 2000 });
        }
      }, err => {
        this.snackBar.open('User does not exist !', 'OK', { duration: 2000 });
      });
    }
  }

}
