import { Component, OnInit } from '@angular/core';

import { Flower } from '../model/flower.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  flowers: Flower[] = [];

  constructor() {}

  ngOnInit(): void {}

  // ngAfterViewInit() {
  //   this.dialog.open(LoginComponent);
  // }
}
