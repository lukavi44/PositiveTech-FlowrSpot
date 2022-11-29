import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthStore } from '../services/auth.store';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../components/dialog/login/login.component';
import { User } from '../model/user.model';
import { NewAccountComponent } from '../components/dialog/new-account/new-account.component';
import { LogoutComponent } from '../components/dialog/logout/logout.component';
import { UserService } from '../services/user.service';
import { SettingsComponent } from '../components/dialog/settings/settings.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() opened = new EventEmitter<any>();
  @Output() user: User = new User();
  userId: number = 1;
  isMenuOpen = false;

  constructor(
    public auth: AuthStore,
    private dialog: MatDialog,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.auth.user$?.subscribe((event) => {
      console.log('Is loggedin : ', event);
    });
  }

  openSettingsDialog(): void {
    let dialogRef = this.dialog.open(SettingsComponent, {
      width: '550px',
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  openLoginDialog(): void {
    let dialogRef = this.dialog.open(LoginComponent, {
      width: '550px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('log iz login dialoga', result);
    });
  }

  openRegisterDialog(): void {
    let dialogRef = this.dialog.open(NewAccountComponent, {
      width: '550px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('log iz register dialoga', result);
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
      console.log('log iz userinfo dialoga', result); //sta ce result
    });
  }

  // getOneUser() {
  //   this.userService.getOne(this.userId).subscribe({
  //     next: (data: any) => {
  //       this.user = data.user;
  //     },
  //     error: (err: any) => {
  //       console.log(err);
  //     },
  //   });
  // }
}
