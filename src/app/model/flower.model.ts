export class Flower {
  id: number;
  name: string;
  latin_name: string;
  sightings: number;
  profile_picture: string;
  favorite: boolean;
  features: string[];
  description: string;

  constructor(obj?: any) {
    this.id = (obj && obj.id) || null;
    this.name = (obj && obj.name) || '';
    this.latin_name = (obj && obj.latin_name) || '';
    this.sightings = (obj && obj.sightings) || null;
    this.profile_picture = (obj && obj.profile_picture) || '';
    this.favorite = (obj && obj.favorite) || false;
    this.features = (obj && obj.features) || null;
    this.description = (obj && obj.description) || null;
  }
}

export class FlowerList {
  flowers: Flower[];

  constructor(obj?: any) {
    this.flowers = (obj && obj.flowers) || [];
  }
}
