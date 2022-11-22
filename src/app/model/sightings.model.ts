import { Flower } from './flower.model';
export class FavoritesSightings {
  id: number;
  user_id: number;
  flower: Flower;

  constructor(obj?: any) {
    this.id = (obj && obj.id) || null;
    this.user_id = (obj && obj.user_id) || null;
    this.flower = (obj && obj.flower) || new Flower();
  }
}

export class Sighting {
  id: number;
  flower_id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  constructor(obj?: any) {
    this.id = (obj && obj.id) || null;
    this.flower_id = (obj && obj.flower_id) || null;
    this.name = (obj && obj.name) || '';
    this.description = (obj && obj.description) || '';
    this.latitude = (obj && obj.latitude) || null;
    this.longitude = (obj && obj.longitude) || null;
  }
}
