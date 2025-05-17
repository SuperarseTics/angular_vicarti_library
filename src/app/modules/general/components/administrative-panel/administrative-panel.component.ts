import { Component, Input, OnInit } from '@angular/core';
import { bookListFilters, categoriesList, filtersCategory } from '../../models/general.type';
import { CategoriesService } from '../../services/categories.service';
import { Subject, takeUntil } from 'rxjs';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-administrative-panel',
  templateUrl: './administrative-panel.component.html',
  styleUrls: ['./administrative-panel.component.scss']
})
export class AdministrativePanelComponent implements OnInit {
  @Input() public max_height!: number;
  @Input() public max_height_menu!: number;

  public loading: boolean = false;
  public filters: bookListFilters = {
    page: 1,
    size: 6,
    order: 'title',
    sort: 'desc',
    f_category: '',
    f_author: '',
    f_title: '',
    f_publication: '',
  }
  public breadcrum: { from: string, to: string } = { from: 'Inicio', to: 'Panel administrativo' };
  public title: string = 'Panel administrativo';
  public menu: { title: string, image: string, description: string }[] = [
    {
      title: 'Agregar libro',
      image: 'assets/pages/reservations/historial.png',
      description: 'Agrega un libro al catálogo'
    },
    {
      title: 'Actualizar libro',
      image: 'assets/pages/reservations/historial.png',
      description: 'Actualiza los datos de un libro'
    },
    {
      title: 'Eliminar libro',
      image: 'assets/pages/reservations/historial.png',
      description: 'Elimina un libro'
    },
    {
      title: 'Gestionar reserva',
      image: 'assets/pages/reservations/historial.png',
      description: 'Gestiona el proceso de reserva'
    },
    {
      title: 'Agregar categoría',
      image: 'assets/pages/reservations/reservas.png',
      description: 'Agrega una categoría'
    },
    {
      title: 'Gestión de categorías',
      image: 'assets/pages/reservations/reservas.png',
      description: 'Visualiza, actualiza y elimina los datos de una categoría'
    },
    {
      title: 'Descargar libros',
      image: 'assets/pages/reservations/file.png',
      description: 'Descarga todos los libros'
    },
  ];

  // public catregories: categoriesList[] = [];

  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private booksService: BooksService,
    private categoriesService: CategoriesService,
  ) { }

  ngOnInit() {

  }

  selectOptionMenu(title: string): void {
    if (title == 'Inicio') {
      return;
    }
    this.title = title;
    this.breadcrum = { from: title != 'Panel administrativo' ? 'Panel administrativo' : 'Inicio', to: title };
  }

  downloadBooks(): void {
    this.loading = true;
    this.booksService.downloadBooks(this.filters).subscribe(
      (response: Blob) => {
        const currentDate = new Date();
        const formattedDate = this.getFormattedDate();
        const fileName = `catalogo_libros_${formattedDate}.csv`;

        const url = window.URL.createObjectURL(response);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();
        window.URL.revokeObjectURL(url);
        this.loading = false;
      },
      (error) => {
        console.error('Error downloading the file', error);
        this.loading = false;
      }
    );
  }

  getFormattedDate(): string {
    const date = new Date();

    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'America/Guayaquil', // Zona horaria
      year: 'numeric', // Correcto: "numeric" en lugar de "string"
      month: '2-digit', // Correcto: "2-digit" en lugar de "string"
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false // Formato de 24 horas
    };

    const formatter = new Intl.DateTimeFormat('en-GB', options);
    const formattedDate = formatter.format(date).replace(/[\s,/:]/g, '');

    return formattedDate;
  };

}
