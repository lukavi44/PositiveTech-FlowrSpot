import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Flower } from 'src/app/model/flower.model';
import { FlowerService } from 'src/app/services/flower.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  favorites: Flower[] = [];
  flowerId: number = -1;
  favoriteId: number = -1;

  constructor(
    private flowerService: FlowerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.route.params.subscribe((params: Params) => {
    //   this.flowerId = params['id'];
    // });
    this.getFavorites();
  }

  getFavorites(): void {
    this.flowerService.getFavoriteFlowers().subscribe({
      next: (data: any) => {
        console.log(data, 'omiljeni cvetovi');
        this.favorites = data;
      },
      error: (err) => console.log(err),
    });
  }

  deleteFavorite(): void {}
}
