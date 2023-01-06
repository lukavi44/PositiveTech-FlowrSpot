import { Component, Input, OnInit } from '@angular/core';
import { Sighting } from 'src/app/model/sightings.model';
import { User } from 'src/app/model/user.model';
import { SightingsService } from 'src/app/services/sightings.service';

@Component({
  selector: 'app-sightings',
  templateUrl: './sightings.component.html',
  styleUrls: ['./sightings.component.scss'],
})
export class SightingsComponent implements OnInit {
  @Input()
  sightings: Sighting[] = [];
  @Input()
  sighting: Sighting = new Sighting();

  placeholderPic = '';
  readMore: boolean = false;

  constructor(private sightingService: SightingsService) {}

  ngOnInit(): void {}

  likeSighting() {
    this.sightingService.postLike(this.sighting.id);
  }
}
