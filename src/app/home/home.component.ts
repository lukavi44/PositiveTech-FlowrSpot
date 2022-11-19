import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Flower } from '../model/flower.model';
import { FlowerService } from '../services/flower.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  flowers: Flower[] = [];
  flower: Flower = new Flower();
  flowerId: number = -1;
  searchForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private flowerService: FlowerService
  ) {
    this.searchForm = fb.group({
      search: new FormControl(''),
    });
  }

  ngOnInit(): void {}

  onSearchSubmit(): void {
    this.router.navigateByUrl('/api/v1/flowers/search/' + this.searchForm); //treba mi index flowera
    // this.route.params.subscribe((params: Params) => {
    //   this.flowerId = params['id'];
    // });
    console.log(this.searchForm.value);
  }

  getOne(): void {
    this.flowerService.getOne(this.flowerId).subscribe((data: any) => {
      this.flower = data;
    });
  }
}
