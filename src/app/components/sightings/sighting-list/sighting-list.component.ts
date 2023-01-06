import { Component, OnInit } from '@angular/core';
import { Sighting } from 'src/app/model/sightings.model';
import { SightingsService } from 'src/app/services/sightings.service';

@Component({
  selector: 'app-sighting-list',
  templateUrl: './sighting-list.component.html',
  styleUrls: ['./sighting-list.component.scss'],
})
export class SightingListComponent implements OnInit {
  sightings: Sighting[] = [];

  constructor(private sightingService: SightingsService) {}

  ngOnInit(): void {
    this.getAllSightings();
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
