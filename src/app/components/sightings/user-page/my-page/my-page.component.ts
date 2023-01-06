import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Sighting } from 'src/app/model/sightings.model';
import { User } from 'src/app/model/user.model';
import { SightingsService } from 'src/app/services/sightings.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.scss'],
})
export class MyPageComponent implements OnInit {
  user: User = new User();
  myId: number = -1;
  sightings: Sighting[] = [];

  constructor(
    private userService: UserService,
    private sightingService: SightingsService
  ) {}

  ngOnInit(): void {
    this.getMyInfo();
  }

  getMyInfo() {
    this.userService.getMyInfo().subscribe({
      next: (data: any) => {
        console.log(data);
        this.user = data.user;
        this.myId = data.user.id;
        this.getMySightings();
      },
      error: (err) => console.log(err),
    });
  }

  getMySightings() {
    this.sightingService.getUserSightings(this.user.id).subscribe({
      next: (data: Sighting[]) => {
        this.sightings = data;
        console.log(this.sightings, 'mojee');
      },
      error: (err) => console.log(err),
    });
  }
}
