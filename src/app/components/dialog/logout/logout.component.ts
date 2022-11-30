import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { AuthStore } from 'src/app/services/auth.store';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  loggedUser: User = new User();
  constructor(
    private authStore: AuthStore,
    private router: Router,
    public dialogRef: MatDialogRef<LogoutComponent>,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getMyInfo();
  }

  logout() {
    this.authStore.logout();
    this.dialogRef.close();
    this.router.navigateByUrl('/home');
  }

  getMyInfo(): void {
    this.userService.getMyInfo().subscribe({
      next: (data: any) => {
        console.log(data, 'get my info log');
        this.loggedUser = data.user;
        localStorage.setItem(
          'user',
          this.loggedUser.first_name + ' ' + this.loggedUser.last_name
        );
      },
      error: (err) => console.log(err),
    });
  }
}
