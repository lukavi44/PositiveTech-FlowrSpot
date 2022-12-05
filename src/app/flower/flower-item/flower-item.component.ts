import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Flower } from 'src/app/model/flower.model';
import { FlowerService } from 'src/app/services/flower.service';

@Component({
  selector: 'app-flower-item',
  templateUrl: './flower-item.component.html',
  styleUrls: ['./flower-item.component.scss'],
})
export class FlowerItemComponent implements OnInit {
  @Input() flower: Flower = new Flower();
  flowerId: number = -1;
  @Input() favorites: Flower[] = [];

  constructor(
    private route: ActivatedRoute,
    private flowerService: FlowerService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.flowerId = params['id'];
    });
  }

  postFavoriteFlower(id: number): void {
    this.flowerService.postToFavorites(id, this.flower).subscribe({
      next: (data: Flower) => {
        this.flower = data;
        this.favorites.push(this.flower);
      },
      error: (err) => console.log(err),
    });
  }
}
