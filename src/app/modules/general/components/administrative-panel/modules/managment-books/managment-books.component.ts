import { Component, Input, OnInit } from '@angular/core';
import { books, categoriesList, filtersCategory } from 'src/app/modules/general/models/general.type';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BooksService } from 'src/app/modules/general/services/books.service';
import { Subject, takeUntil } from 'rxjs';
import { ConstantService } from 'src/app/modules/providers/constant.service';
import { CategoriesService } from 'src/app/modules/general/services/categories.service';

@Component({
  selector: 'app-managment-books',
  templateUrl: './managment-books.component.html',
  styleUrls: ['./managment-books.component.scss']
})
export class ManagmentBooksComponent implements OnInit {
  @Input() public max_height!: number;
  @Input() public type!: 'edit' | 'new' | 'delete';
  public catregories: categoriesList[] = [];

  public book: books = {
    code: '',
    title: '',
    category: '',
    publication: '',
    author: '',
    edition: '',
    synopsis: '',
    stock: 0,
    cover: null,
    status_boolean: true
  };

  public loadingSearch: boolean = false;
  public loadignSave: boolean = false;

  public errors_message: string[] = [];
  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private modalService: NzModalService,
    private booksService: BooksService,
    private categoriesService: CategoriesService,
    private constantService: ConstantService,
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    const filterCategories: filtersCategory = {
      page: 1,
      size: 50,
      order: 'title',
      sort: 'asc',
    }
    this.categoriesService.getCategories(filterCategories)
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe(
      (res) => {
        if (res) {
          this.catregories = res.data;
        }
      }
    );
  }

  fileBrowseHandler(event: any): void {
    let files = event.files;
    this.book.cover = files[0];
  }

  save(): void {
    this.checkBook();
    if (this.loadignSave) {
      return;
    }
    if (this.errors_message.length > 0 && this.type != 'delete') {
      let title: string = this.type == 'new' ? 'Agregar Libro' : 'Actualizar Libro';
      let content: string = `El libro no se puede ${this.type == 'new' ? 'agrear' : 'editar'} porque: <br>»${this.errors_message.join('<br>»')}`;
      this.modalMessages('error', title, content);
      return;
    }

    if (this.type == 'new') {
      this.loadignSave = true;
      this.booksService.createBook(this.book)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(
        (res) => {
          this.modalMessages('success', 'Agregar Libro', 'Libro agregado exitosamente.');
          this.newBook();
        },
        (error) => {
          const content = this.constantService.getErrorsBack(error);
          this.modalMessages('error', 'Agregar Libro', `No se pudo agregador el libro porque: ${content}`);
          this.loadignSave = false;
        },
        () => {
          this.loadignSave = false;
        }
      );
    } else if (this.type == 'edit') {
      this.loadignSave = true;
      this.booksService.updateBook(this.book)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(
        (res) => {
          this.modalMessages('success', 'Agregar Libro', 'Libro agregado exitosamente.');
          this.newBook();
        },
        (error) => {
          const content = this.constantService.getErrorsBack(error);
          this.modalMessages('error', 'Agregar Libro', `No se pudo agregador el libro porque: ${content}`);
          this.loadignSave = false;
        },
        () => {
          this.loadignSave = false;
        }
      );
    } else {
      if (this.book.code == '') {
        this.modalMessages('info', 'Eliminar Libro', 'El código del libro es requerido.');
        return;
      }
      this.loadignSave = true;
      this.booksService.deleteBook(this.book.code)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(
        (res) => {
          this.modalMessages('success', 'Eliminar Libro', 'Libro eliminado exitosamente.');
          this.newBook();
        },
        (error) => {
          const content = this.constantService.getErrorsBack(error);
          this.modalMessages('error', 'Eliminar Libro', `No se pudo eliminar el libro porque: ${content}`);
          this.loadignSave = false;
        },
        () => {
          this.loadignSave = false;
        }
      );
    }

  }

  checkBook(): void {
    this.errors_message = [];
    if (this.book.title == '') {
      this.errors_message.push('El título del libro es obligatorio')
    }
    if (this.book.category == '') {
      this.errors_message.push('La categoría del libro es obligatoria')
    }
    if (this.book.publication == '') {
      this.errors_message.push('El año del libro es obligatorio')
    }
    if (this.book.author == '') {
      this.errors_message.push('El autor del libro es obligatorio')
    }
    if (this.book.synopsis == '') {
      this.errors_message.push('La sinopsis del libro es obligatoria')
    }
    if (this.book.cover == null && this.type == 'new') {
      this.errors_message.push('La portada del libro es obligatoria');
    }
    if (this.book.cover != null && this.type == 'new' && this.book.cover.name) {
      let arrayName: string[] = this.book.cover.name.split('.');
      const ext: string = arrayName[arrayName.length - 1].toLowerCase();
      const extValids: string[] = ['jpg', 'jpeg', 'png'];
      if (!extValids.includes(ext)) {
        this.errors_message.push('La portada del libro solo acepta formatos: ' + extValids.join(', '));
      }
    }
    if (this.type == 'edit' && this.book.cover && this.book.cover.name) {
      let arrayName: string[] = this.book.cover.name.split('.');
      const ext: string = arrayName[arrayName.length - 1].toLowerCase();
      const extValids: string[] = ['jpg', 'jpeg', 'png'];
      if (!extValids.includes(ext)) {
        this.errors_message.push('La portada del libro solo acepta formatos: ' + extValids.join(', '));
      }
    }
    if (this.type == 'edit' && this.book.cover && this.book.cover.name) {
      let arrayName: string[] = this.book.cover.name.split('.');
      const ext: string = arrayName[arrayName.length - 1].toLowerCase();
      const extValids: string[] = ['jpg', 'jpeg', 'png'];
      if (!extValids.includes(ext)) {
        this.errors_message.push('La portada del libro solo acepta formatos: ' + extValids.join(', '));
      }
    }
    if (this.type == 'edit' && this.book.code == null) {
      this.errors_message.push('El código del libro es obligatorio para su actualización');
    }
  }

  getBook(): void {
    if (this.loadingSearch) {
      return;
    }
    if (this.book.code == '') {
      this.modalMessages('info', 'Buscar libro', 'El código del libro es requerido.');
      return;
    }
    this.loadingSearch = true;
    this.booksService.getBook(this.book.code)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(
        (res) => {
          // this.modalMessages('success', 'Agregar Libro', 'Libro agregado exitosamente.');
          if (res && res.data) {
            this.book = {
              id: res.data.id,
              status: res.data.status,
              status_boolean: res.data.status == 'Activo',
              code: res.data.code,
              title: res.data.title,
              category: this.catregories.find(item => item.title == res.data.category)?.id || '',
              publication: res.data.publication,
              author: res.data.author,
              edition: res.data.edition,
              synopsis: res.data.synopsis,
              stock: res.data.stock,
              cover: null,
            }
          } else {
            const message: string = res.message ? res.message : 'No fue posible encontrar el libro'
            this.modalMessages('error', 'Buscar Libro', message);
          }
        },
        (error) => {
          const content = this.constantService.getErrorsBack(error);
          this.modalMessages('error', 'Buscar Libro', `No se pudo agregador el libro porque: ${content}`);
          this.loadingSearch = false;
        },
        () => {
          this.loadingSearch = false;
        }
      );
  }

  newBook(): void {
    this.book = {
      code: '',
      title: '',
      category: '',
      publication: '',
      author: '',
      edition: '',
      synopsis: '',
      stock: 0,
      cover: null,
      status_boolean: true,
    };
  }

  private modalMessages(type: string, title: string, content: string): void {
    switch (type) {
      case 'error':
        this.modalService.error({
          nzTitle: title,
          nzContent: content,
          nzClosable: false,
          nzWidth: 500,
        });
        break;
      case 'success':
        this.modalService.success({
          nzTitle: title,
          nzContent: content,
          nzClosable: false,
          nzWidth: 500,
        });
        break;
      case 'info':
        this.modalService.info({
          nzTitle: title,
          nzContent: content,
          nzClosable: false,
          nzWidth: 500,
        });
        break;
      default:
        break;
    }
  }
}
