import { Component, Input, OnInit } from '@angular/core';
import { Flower } from '../model/flower.model';
import { FlowerService } from '../services/flower.service';

@Component({
  selector: 'app-flower',
  templateUrl: './flower.component.html',
  styleUrls: ['./flower.component.scss'],
})
export class FlowerComponent implements OnInit {
  flowers: Flower[] = [];

  constructor(private flowerService: FlowerService) {}

  ngOnInit(): void {
    this.getFlowers();
  }

  getFlowers() {
    this.flowerService.getRandomFlowers().subscribe({
      next: (data: Flower[]) => {
        console.log(data);
        this.flowers = data;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
