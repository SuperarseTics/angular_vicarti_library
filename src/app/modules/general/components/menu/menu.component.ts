import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { menuItems } from '../../models/general.type';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() public menu_items!: menuItems[];

  @Output('selectMenu') selectMenu: EventEmitter<{ selectMenu: string }> = new EventEmitter<{ selectMenu: string }>();

  constructor() { }

  ngOnInit(): void {
    this.getMenu();
  }

  getMenu(): void {

  }

  showMenu(route: string): void {
    this.selectMenu.emit({ selectMenu: route })
  }

}
