export class User {
  id: number;
  first_name: string;
  last_name: string;

  constructor(obj?: any) {
    this.id = (obj && obj.id) || null;
    this.first_name = (obj && obj.first_name) || '';
    this.last_name = (obj && obj.last_name) || '';
  }
}

export class UserLogin {
  email: string;
  password: string;
  auth_token?: string;
  error?: string;

  constructor(obj?: any) {
    this.email = (obj && obj.email) || null;
    this.password = (obj && obj.password) || null;
    this.auth_token = (obj && obj.auth_token) || null;
    this.error = (obj && obj.error) || null;
  }
}
