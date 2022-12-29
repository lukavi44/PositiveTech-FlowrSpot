import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-geocoding',
  templateUrl: './geocoding.component.html',
  styleUrls: ['./geocoding.component.scss'],
})
export class GeocodingComponent implements OnInit, AfterViewInit {
  constructor() {}
  ngOnInit() {
    (mapboxgl as any).accessToken =
      'pk.eyJ1IjoibHVrYXZpNDQiLCJhIjoiY2xieGlkMDl1MDdhbTNvcm1sbThoa2N3ZSJ9.xRmYD6lKyJrGlwUUrzHZFA';
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [19.833549, 45.267136], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
    map.on('click', function (e) {
      var coordinates = e.lngLat;
      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML('you clicked here: <br/>' + coordinates)
        .addTo(map);
    });
  }

  ngAfterViewInit(): void {}
}
