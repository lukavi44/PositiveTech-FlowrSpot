import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthStore } from '../services/auth.store';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../components/login/login.component';
import { User } from '../model/user.model';
import { NewAccountComponent } from '../components/new-account/new-account.component';
import { LogoutComponent } from '../components/logout/logout.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() opened = new EventEmitter<any>();
  @Output() user: User = new User();
  isMenuOpen = false;

  constructor(public auth: AuthStore, private dialog: MatDialog) {}

  ngOnInit(): void {}

  openLoginDialog(): void {
    let dialogRef = this.dialog.open(LoginComponent, {
      width: '550px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.user = result;
      console.log(result);
    });
  }

  openRegisterDialog(): void {
    let dialogRef = this.dialog.open(NewAccountComponent, {
      width: '550px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.user = result;
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.opened.emit();
  }

  openUserInfoDialog(): void {
    let dialogRef = this.dialog.open(LogoutComponent, {
      width: '550px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.user = result;
    });
  }
}
