import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Flower } from 'src/app/model/flower.model';
import { Sighting } from 'src/app/model/sightings.model';
import { FlowerService } from 'src/app/services/flower.service';

@Component({
  selector: 'app-flower-detail',
  templateUrl: './flower-detail.component.html',
  styleUrls: ['./flower-detail.component.scss'],
})
export class FlowerDetailComponent implements OnInit {
  flower: Flower = new Flower();
  flowerId: number = -1;

  flowerSightings: Sighting[] = [];

  mobile: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private flowerService: FlowerService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.flowerId = params['id'];
    });
    if (window.screen.width <= 550) {
      // 768px portrait
      this.mobile = true;
    }
    this.getOneFlower();
    this.getFlowerSightings();
  }

  getOneFlower() {
    this.flowerService.getOne(this.flowerId).subscribe((data: any) => {
      this.flower = data.flower;
      console.log('flo-detail component', this.flower);
    });
  }

  getFlowerSightings() {
    this.flowerService.getFlowerSightings(this.flowerId).subscribe({
      next: (data: any) => {
        this.flowerSightings = data;
      },
      error: (err) => console.log(err),
    });
  }
}
