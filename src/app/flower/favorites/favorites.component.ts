import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FavoriteFlower, Flower } from 'src/app/model/flower.model';
import { FlowerService } from 'src/app/services/flower.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  favorites: FavoriteFlower[] = [];
  favorite: FavoriteFlower = new FavoriteFlower();
  flowerId: number = -1;
  favoriteId: number = -1;

  constructor(
    private flowerService: FlowerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getFavorites();
  }

  getFavorites(): void {
    this.flowerService.getFavoriteFlowers().subscribe({
      next: (data: any) => {
        console.log(data, 'omiljeni cvetovi');
        this.favorites = data.fav_flowers;
        console.log(this.favorites[0].flower.name);
      },
      error: (err) => console.log(err),
    });
  }

  onRemoveFavorite(flowerId: number): void {
    this.flowerService.deleteFavorite(flowerId, this.favoriteId).subscribe({
      next: (data: any) => {
        let favoriteId = this.favorites
          .map((fav: FavoriteFlower) => fav.id)
          .indexOf(data.id);
        this.favorites.splice(favoriteId, 1);
        this.getFavorites();
      },
      error: (err) => console.log(err),
    });
  }
}
