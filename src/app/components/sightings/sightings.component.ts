import { Component, OnInit } from '@angular/core';
import { Sighting } from 'src/app/model/sightings.model';
import { User } from 'src/app/model/user.model';
import { SightingsService } from 'src/app/services/sightings.service';

@Component({
  selector: 'app-sightings',
  templateUrl: './sightings.component.html',
  styleUrls: ['./sightings.component.scss'],
})
export class SightingsComponent implements OnInit {
  sightings: Sighting[] = [];
  userSightings: Sighting[] = [];

  userId: number = -1;
  user: User = new User();

  placeholderPic = '';
  readMore: boolean = false;

  constructor(private sightingService: SightingsService) {}

  ngOnInit(): void {
    this.getAllSightings();
  }

  getUserSightings() {
    this.sightingService.getUserSightings(this.userId).subscribe({
      next: (data: Sighting[]) => {
        this.userSightings = data;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  getAllSightings() {
    this.sightingService.getAllSightings().subscribe({
      next: (data: Sighting[]) => {
        this.sightings = data;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
