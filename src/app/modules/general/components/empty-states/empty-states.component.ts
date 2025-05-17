import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-states',
  templateUrl: './empty-states.component.html',
  styleUrls: ['./empty-states.component.scss']
})
export class EmptyStatesComponent implements OnInit {
  @Input() public empty!: {
    title: string,
    style_title: string,
    type: 'image' | 'icon',
    style_image_icon: string,
    text: string,
    style_text: string,
    src: string,
  };

  constructor() { }

  ngOnInit() {
  }

}
