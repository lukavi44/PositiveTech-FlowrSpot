import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FavoriteFlower, Flower } from 'src/app/model/flower.model';
import { FlowerService } from 'src/app/services/flower.service';

@Component({
  selector: 'app-flower-item',
  templateUrl: './flower-item.component.html',
  styleUrls: ['./flower-item.component.scss'],
})
export class FlowerItemComponent implements OnInit {
  @Input() flower: Flower = new Flower();
  flowerId: number = -1;
  @Input() favorites: FavoriteFlower[] = [];
  @Input() favorite: FavoriteFlower = new FavoriteFlower();

  @Output()
  onRemove: EventEmitter<number> = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private flowerService: FlowerService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.flowerId = params['id'];
    });
  }

  removeFavorite(flowerId: number): void {
    this.onRemove.emit(flowerId);
  }

  postFavoriteFlower(): void {
    this.flowerService.postToFavorites(this.flower.id).subscribe({
      next: (data: FavoriteFlower) => {
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
