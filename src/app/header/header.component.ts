import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthStore } from '../services/auth.store';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../components/login/login.component';
import { User } from '../model/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() opened = new EventEmitter<any>();
  @Input() user: User = new User();
  isMenuOpen = false;

  constructor(public auth: AuthStore, private dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog(): void {
    let dialogRef = this.dialog.open(LoginComponent, {
      width: '550px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.user = result; //glupost teska
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.opened.emit();
  }

  logout() {
    this.auth.logout();
  }
}
