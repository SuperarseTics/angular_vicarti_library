import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-page',
  templateUrl: './loading-page.component.html',
  styleUrls: ['./loading-page.component.scss']
})
export class LoadingPageComponent implements OnInit {
  @Input() public text_loadding: string = 'Cargando...';

  constructor() { }

  ngOnInit() {
  }

}
