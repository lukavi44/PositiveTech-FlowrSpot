import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthStore } from 'src/app/services/auth.store';
import { UserService } from 'src/app/services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User, UserRegister } from 'src/app/model/user.model';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss'],
})
export class NewAccountComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  newUser: UserRegister = new UserRegister();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthStore,
    private userService: UserService,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<NewAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserRegister
  ) {
    this.registerForm = fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    if (this.auth.isLoggedIn$) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {}

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    console.log('in submit');
    this.userService
      .register(this.registerForm.value)
      .pipe(first())
      .subscribe({
        next: (data: any) => {
          alert('Registration successful');
          this.newUser = new UserRegister(data);
          this.router.navigate(['/login'], { relativeTo: this.route });
        },
        error: (error) => {
          alert(error);
          this.loading = false;
        },
      });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
