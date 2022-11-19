import { Component, Input, OnInit } from '@angular/core';
import { Flower } from 'src/app/model/flower.model';

@Component({
  selector: 'app-flower-item',
  templateUrl: './flower-item.component.html',
  styleUrls: ['./flower-item.component.scss'],
})
export class FlowerItemComponent implements OnInit {
  @Input() flower: Flower = new Flower();
  @Input() index: number = -1;

  constructor() {}

  ngOnInit(): void {}
}
