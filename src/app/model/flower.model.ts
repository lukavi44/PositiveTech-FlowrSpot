export class Flower {
  id: number;
  name: string;
  latin_name: string;
  sightings: number;
  profile_picture: string;
  favorite: boolean;
  features: string[];
  description: string;

  constructor(obj?: Flower) {
    this.id = (obj && obj.id) || 0;
    this.name = (obj && obj.name) || '';
    this.latin_name = (obj && obj.latin_name) || '';
    this.sightings = (obj && obj.sightings) || 0;
    this.profile_picture = (obj && obj.profile_picture) || '';
    this.favorite = (obj && obj.favorite) || false;
    this.features = (obj && obj.features) || [];
    this.description = (obj && obj.description) || '';
  }
}

export class FlowerList {
  flowers: Flower[];

  constructor(obj?: any) {
    this.flowers = (obj && obj.flowers) || [];
  }
}

export class FavoriteFlower {
  id: number;
  user_id: number;
  flower: Flower;

  constructor(obj?: any) {
    this.id = (obj && obj.id) || null;
    this.user_id = (obj && obj.user_id) || null;
    this.flower = (obj && obj.flower) || null;
  }
}
