import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

import { Sighting } from 'src/app/model/sightings.model';
import { SightingsService } from 'src/app/services/sightings.service';

const mbxClient = require('@mapbox/mapbox-sdk');
const mbxStyles = require('@mapbox/mapbox-sdk/services/styles');
const mbxTilesets = require('@mapbox/mapbox-sdk/services/tilesets');

const baseClient = mbxClient({
  accessToken:
    'pk.eyJ1IjoibHVrYXZpNDQiLCJhIjoiY2xieGlkMDl1MDdhbTNvcm1sbThoa2N3ZSJ9.xRmYD6lKyJrGlwUUrzHZFA',
});
const stylesService = mbxStyles(baseClient);
const tilesetsService = mbxTilesets(baseClient);

@Component({
  selector: 'app-new-sighting',
  templateUrl: './new-sighting.component.html',
  styleUrls: ['./new-sighting.component.scss'],
})
export class NewSightingComponent implements OnInit {
  @Input() sighting: Sighting = new Sighting();
  file: File | undefined;
  constructor(
    private sightingService: SightingsService,
    private http: HttpClient
  ) {}

  onFilechange(event: any) {
    console.log(event.target.files[0]);
    this.file = event.target.files[0];
  }

  ngOnInit(): void {
    console.log(history.state.data);
    (mapboxgl as any).accessToken =
      'pk.eyJ1IjoibHVrYXZpNDQiLCJhIjoiY2xieGlkMDl1MDdhbTNvcm1sbThoa2N3ZSJ9.xRmYD6lKyJrGlwUUrzHZFA';
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [19.833549, 45.267136], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  }

  postSighting(): void {
    const sightingNew = {
      flower_id: Number(history.state.data),
      name: this.sighting.name,
      description: this.sighting.description,
      latitude: Number(this.sighting.latitude),
      longitude: Number(this.sighting.longitude),
      picture: new FormData().append('file', this.sighting.picture),
    };
    this.sightingService.postSighting(sightingNew).subscribe({
      next: (data: any) => {
        if (
          !this.sighting.name &&
          !this.sighting.latitude &&
          !this.sighting.longitude
        ) {
          alert('Title, latitude and longitude are required');
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
