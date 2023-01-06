import { User } from '../model/user.model';
import { Flower } from './flower.model';

export class Sighting {
  id: number;
  name: string;
  description: string;
  picture: any;
  likes_count: number;
  comments_count: number;
  created_at: string;
  latitude: number;
  longitude: number;
  user: User;
  flower: Flower;
  constructor(obj?: any) {
    this.id = (obj && obj.id) || null;
    this.name = (obj && obj.name) || '';
    this.description = (obj && obj.description) || '';
    this.latitude = (obj && obj.latitude) || null;
    this.longitude = (obj && obj.longitude) || null;
    this.picture = (obj && obj.picture) || '';
    this.likes_count = (obj && obj.likes_count) || 0;
    this.comments_count = (obj && obj.comments_count) || 0;
    this.created_at = (obj && obj.created_at) || null;
    this.user = (obj && obj.user) || null;
    this.flower = (obj && obj.flower) || null;
  }
}

export class SightingLike {
  id: number;
  user_id: number;
  user_full_name: string;
  sighting_id: number;

  constructor(obj?: any) {
    this.id = (obj && obj.id) || null;
    this.user_id = (obj && obj.user_id) || null;
    this.user_full_name = (obj && obj.user_full_name) || null;
    this.sighting_id = (obj && obj.sighting_id) || null;
  }
}

export class SightingComment {
  id: number;
  user_id: number;
  user_full_name: string;
  sighting_id: number;
  content: string;

  constructor(obj?: any) {
    this.id = (obj && obj.id) || null;
    this.user_id = (obj && obj.user_id) || null;
    this.user_full_name = (obj && obj.user_full_name) || null;
    this.sighting_id = (obj && obj.sighting_id) || null;
    this.content = (obj && obj.content) || null;
  }
}
