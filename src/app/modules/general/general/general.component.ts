import { AuthService } from './../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConstantService } from '../../providers/constant.service';
import { authUser, userData } from '../../auth/models/auth.type';
import { menuItems } from '../models/general.type';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
  public menu_items: menuItems[] = [];
  public select_menu: string = 'home';
  public id_conteiner: string = 'container-global';
  public show_drawer: boolean = false;
  public user: userData | null = null;

  constructor(
    private router: Router,
    private constantService: ConstantService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.getUser();
    this.generateMenu();
    setInterval(() => {
      this.getUser();
    }, 1000);
    window.addEventListener('resize', this.onResize.bind(this));
  }

  generateMenu(): void {
    if (this.user && this.user.role == 'administrador') {
      this.menu_items = [
        { show: true, icon: 'bx bx-home', title: 'Inicio', route: 'home' },
        { show: true, icon: 'bx bx-laptop', title: 'Reservas', route: 'reservations' },
        { show: true, icon: 'bx bx-bar-chart-alt-2', title: 'Reportes', route: 'reports' },
        { show: true, icon: 'bx bx-book-open', title: 'Panel Administrativo', route: 'administrative_panel' },
        { show: true, icon: 'bx bxs-cog', title: 'Configuración', route: 'configuration' },
      ];
    } else {
      this.menu_items = [
        { show: true, icon: 'bx bx-home', title: 'Inicio', route: 'home' },
        { show: true, icon: 'bx bx-laptop', title: 'Reservas', route: 'reservations' },
        { show: false, icon: 'bx bx-bar-chart-alt-2', title: 'Reportes', route: 'reports' },
        { show: false, icon: 'bx bx-book-open', title: 'Panel Administrativo', route: 'administrative_panel' },
        { show: false, icon: 'bx bxs-cog', title: 'Configuración', route: 'configuration' },
      ];
    }

  }

  getUser(): void {
    const storedData = localStorage.getItem(this.constantService.nameLocaleStorage);
    if (storedData) {
      this.authService.authUser = JSON.parse(storedData);
      this.user = this.authService.getUser();
    } else {
      this.router.navigate(['/auth/sign-in']);
    }
  }

  onResize(): void {
    this.getHeight();
    this.getHeightReports();
    this.getHeightManagmentBooks();
  }

  selectMenu(event: { selectMenu: string }): void {
    this.managmentDrawer(false);
    if (event && event.selectMenu) {
      this.select_menu = event.selectMenu;
    }
  }

  getHeight(): number {
    let height_return: number = 300;
    const points = { x1: 584, x2: 756, y1: 345, y2: 510 };
    const conteiner = document.getElementById(this.id_conteiner);
    if (conteiner) {
      const height = conteiner.offsetHeight;
      const max_height = this.calcularAltura(height, points);
      height_return = max_height
    }
    return height_return;
  }

  getHeightReports(): number {
    let height_return: number = 300;
    const points = { x1: 584, x2: 756, y1: 465, y2: 635 };
    const conteiner = document.getElementById(this.id_conteiner);
    if (conteiner) {
      const height = conteiner.offsetHeight;
      const max_height = this.calcularAltura(height, points);
      height_return = max_height
    }
    return height_return;
  }

  getHeightManagmentBooks(): number {
    let height_return: number = 300;
    const points = { x1: 584, x2: 756, y1: 380, y2: 550 };
    const conteiner = document.getElementById(this.id_conteiner);
    if (conteiner) {
      const height = conteiner.offsetHeight;
      const max_height = this.calcularAltura(height, points);
      height_return = max_height
    }
    return height_return;
  }

  getHeightConfiguration(): number {
    let height_return: number = 300;
    const points = { x1: 584, x2: 756, y1: 405, y2: 580 };
    const conteiner = document.getElementById(this.id_conteiner);
    if (conteiner) {
      const height = conteiner.offsetHeight;
      const max_height = this.calcularAltura(height, points);
      height_return = max_height
    }
    return height_return;
  }

  getHeightAdministrative(): number {
    let height_return: number = 300;
    const points = { x1: 584, x2: 756, y1: 445, y2: 605 };
    const conteiner = document.getElementById(this.id_conteiner);
    if (conteiner) {
      const height = conteiner.offsetHeight;
      const max_height = this.calcularAltura(height, points);
      height_return = max_height
    }
    return height_return;
  }

  calcularAltura(height: number, points: { x1: number, x2: number, y1: number, y2: number }): number {
    // x1 Pantalla 1 x2 Pantalla 2
    // y1 Alto 1 y2 Alto 2
    const m = (points.y2 - points.y1) / (points.x2 - points.x1);
    const b = points.y1 - m * points.x1;
    return m * height + b;
  }

  managmentDrawer(show: boolean): void {
    this.show_drawer = show;
  }

  closeSession(): void {
    this.managmentDrawer(false);
    localStorage.removeItem(this.constantService.nameLocaleStorage);
    this.router.navigate(['/auth/sign-in']);
  }

}
