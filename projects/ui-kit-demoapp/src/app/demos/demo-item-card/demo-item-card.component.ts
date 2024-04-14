import { Component, OnInit } from '@angular/core';
import { ItemCardComponent } from 'ui-kit';

@Component({
  template: `<df-item-card [tags]="tags" [item]="product" />`,
  standalone: true,
  imports: [ItemCardComponent],
})
export class DemoItemCardComponent implements OnInit {
  product = {
    id: 1,
    name: 'Advanced Angular Forms',
    imageURL:
      'https://import.cdn.thinkific.com/420070%2Fcustom_site_themes%2Fid%2FtsCS7XUVR56XzU2wm6ma_600x384%402x.png',
    price: 99,
  };
  tags = ['Angular', 'Angular CDK', 'Angular Forms'];

  ngOnInit() {}
}
