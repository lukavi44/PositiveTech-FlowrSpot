import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flower-list',
  templateUrl: './flower-list.component.html',
  styleUrls: ['./flower-list.component.scss'],
})
export class FlowerListComponent implements OnInit {
  @Input() searchForm: FormGroup;

  constructor(private router: Router, fb: FormBuilder) {
    this.searchForm = fb.group({
      search: new FormControl(''),
    });
  }

  ngOnInit(): void {}

  onSearchSubmit(): void {
    this.router.navigateByUrl('/api/v1/flowers/search/' + this.searchForm); //treba mi index flowera
    console.log(this.searchForm.value);
  }
}
