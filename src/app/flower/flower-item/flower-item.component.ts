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
  @Input() favorite: Flower = new Flower();

  constructor(
    private route: ActivatedRoute,
    private flowerService: FlowerService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.flowerId = params['id'];
    });
  }

  postFavoriteFlower(): void {
    this.flowerService.postToFavorites(this.flower.id).subscribe({
      next: (data: Flower) => {
        this.favorite = data;
        this.favorites.push(this.favorite);
      },
      error: (err) => {
        if (err.error.error[0] === 'User has already been taken') {
          alert('This flower has already been declared as favourite');
        }
      },
    });
  }
}
