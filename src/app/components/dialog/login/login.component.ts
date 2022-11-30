import { Component, Inject, OnInit } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { AuthStore } from 'src/app/services/auth.store';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User, UserLogin } from 'src/app/model/user.model';
import { BehaviorSubject } from 'rxjs';
import { Token } from '@angular/compiler';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  authToken: string = '';
  loggedUser: User = new User();

  constructor(
    private auth: AuthStore,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserLogin
  ) {
    this.loginForm = fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.submitted = true;

    this.loading = true;

    const val = this.loginForm.value;
    this.auth.login(val.email, val.password).subscribe(
      () => {
        alert(
          'Congratulations! You have successfully signed up for FlowrSpot!'
        );
        this.dialogRef.close();
        this.auth.isLoggedIn$ = new BehaviorSubject<boolean>(true);
      },
      (err) => {
        alert('Login has failed!');
        this.loading = false;
      }
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
