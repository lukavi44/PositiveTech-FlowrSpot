import { Component, OnInit } from '@angular/core';

import { Flower } from '../model/flower.model';
import { FlowerService } from '../services/flower.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  flowers: Flower[] = [];

  constructor(private flowerService: FlowerService) {}

  ngOnInit(): void {
    // this.getFlowers();
  }
  // getFlowers() {
  //   this.flowerService.getFlowers().subscribe({
  //     next: (data: Flower[]) => {
  //       console.log(data);
  //       this.flowers = data;
  //     },
  //     error: (err: any) => {
  //       console.log(err);
  //     },
  //   });
  // }
}
