import { Component, Input, OnInit } from '@angular/core';
import { Sighting } from 'src/app/model/sightings.model';
import { SightingsService } from 'src/app/services/sightings.service';

@Component({
  selector: 'app-new-sighting',
  templateUrl: './new-sighting.component.html',
  styleUrls: ['./new-sighting.component.scss'],
})
export class NewSightingComponent implements OnInit {
  @Input() sighting: Sighting = new Sighting();

  constructor(private sightingService: SightingsService) {}

  ngOnInit(): void {}

  postSighting(): void {
    this.sightingService.postSighting(this.sighting).subscribe({
      next: (data: any) => {
        if (
          !this.sighting.name &&
          !this.sighting.latitude &&
          !this.sighting.longitude
        ) {
          alert('Title or latitude/longitude are required');
        }
        this.sighting.name = data.name;
        this.sighting.latitude = data.latitude;
        this.sighting.longitude = data.longitude;
        this.sighting.picture = data.picture;
        this.sighting.description = data.description;
      },
      error: (err: any) => alert(JSON.stringify(err)),
    });
  }
}
