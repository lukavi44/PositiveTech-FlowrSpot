import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Flower } from 'src/app/model/flower.model';
import { FlowerService } from 'src/app/services/flower.service';

@Component({
  selector: 'app-flower-detail',
  templateUrl: './flower-detail.component.html',
  styleUrls: ['./flower-detail.component.scss'],
})
export class FlowerDetailComponent implements OnInit {
  flower: Flower = new Flower();
  flowerId: number = -1;
  constructor(
    private route: ActivatedRoute,
    private flowerService: FlowerService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.flowerId = params['id'];
    });
    this.getOneFlower();
  }

  getOneFlower() {
    this.flowerService.getOne(this.flowerId).subscribe((data: any) => {
      this.flower = data.flower;
      console.log('flo-detail component', this.flower);
    });
  }
}
