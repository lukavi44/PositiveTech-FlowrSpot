export class Comment {
  id: number;
  user_id: number;
  user_full_name: string;
  sighting_id: number;
  content: string;

  constructor(obj?: any) {
    this.id = (obj && obj.id) || null;
    this.user_id = (obj && obj.user_id) || null;
    this.user_full_name = (obj && obj.user_full_name) || '';
    this.sighting_id = (obj && obj.sighting_id) || null;
    this.content = (obj && obj.content) || '';
  }
}
