import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Sighting } from 'src/app/model/sightings.model';
import { User } from 'src/app/model/user.model';
import { SightingsService } from 'src/app/services/sightings.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit {
  user: User = new User();
  userId: number = -1;
  userSightings: Sighting[] = [];

  constructor(
    private userService: UserService,
    private sightingService: SightingsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.userId = params['id'];
      console.log(this.userId);
    });
    this.getUser();
    this.getUserSightings();
  }

  getUserSightings() {
    this.sightingService.getUserSightings(this.userId).subscribe({
      next: (data: Sighting[]) => {
        console.log(data, 'user-page');
        this.userSightings = data;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  getUser() {
    this.userService.getOne(this.userId).subscribe((data: any) => {
      this.user = data.user;
      console.log('iz user-page component', this.user);
    });
  }
}
