import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthStore } from 'src/app/services/auth.store';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  constructor(
    private authStore: AuthStore,
    private router: Router,
    public dialogRef: MatDialogRef<LogoutComponent>
  ) {}

  ngOnInit(): void {}

  logout() {
    this.authStore.logout();
    this.dialogRef.close();
    this.router.navigateByUrl('/home');
  }
}
