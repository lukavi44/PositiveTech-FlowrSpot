import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Flower } from 'src/app/model/flower.model';

@Component({
  selector: 'app-flower-item',
  templateUrl: './flower-item.component.html',
  styleUrls: ['./flower-item.component.scss'],
})
export class FlowerItemComponent implements OnInit {
  @Input() flower: Flower = new Flower();
  @Input() flowerId: number = -1;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.flowerId = params['id'];
    });
  }
}
