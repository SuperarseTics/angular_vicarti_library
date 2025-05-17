import { Component, Input, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subject, takeUntil } from 'rxjs';
import { categoriesList, filtersCategory } from 'src/app/modules/general/models/general.type';
import { CategoriesService } from 'src/app/modules/general/services/categories.service';
import { ConstantService } from 'src/app/modules/providers/constant.service';

@Component({
  selector: 'app-managment-categories',
  templateUrl: './managment-categories.component.html',
  styleUrls: ['./managment-categories.component.scss']
})
export class ManagmentCategoriesComponent implements OnInit {
  @Input() public max_height!: number;
  @Input() public type!: 'new' | 'managment';

  public filterCategories: filtersCategory = {
    page: 1,
    size: 5,
    order: 'title',
    sort: 'asc',
  }

  public title: string = '';

  public catregories: categoriesList[] = [];
  public categorie: { id: number, title: string, status: boolean } = { title: '', status: true, id: 0 };
  public blockPrevPage: boolean = false;
  public blockNextPage: boolean = false;
  public styleGridTable: string = 'grid-template-columns: 1fr 1fr 1fr;';
  public loading: boolean = false;
  public loadingSearch: boolean = false;

  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private modalService: NzModalService,
    private categoriesService: CategoriesService,
    private constantService: ConstantService,
  ) { }

  ngOnInit() {
    if (this.type == 'new') {
      this.title = 'Agregar nueva categoría';
    } else {
      this.title = 'Gestión de categorías';
      this.getCategories();
    }
  }

  getCategories(): void {
    this.loading = true;
    this.categoriesService.getCategories(this.filterCategories)
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe(
      (res) => {
        if (res) {
          this.catregories = res.data;
          this.blockPrevPage = res.meta.current_page == 1;
          this.blockNextPage = res.meta.current_page == res.meta.last_page;
        }
      },
      (error) => {
        this.loading = false;
        this.constantService.getErrorsBack(error);
      },
      () => {
        this.loading = false;
        this.title = 'Gestión de categorías';
      }
    );
  }

  managmentPages(type: 'next' | 'prev'): void {
    if (type == 'next') {
      if (!this.blockNextPage) {
        this.filterCategories.page ++;
        this.getCategories();
      }
    } else {
      if (!this.blockPrevPage) {
        this.filterCategories.page --;
        this.getCategories();
      }
    }
  }

  editCategory(category: categoriesList): void {
    this.categorie = {
      title: category.title,
      id: category.id,
      status: category.status == 'Activo'
    }
    this.title = 'Actualizar categoría';
  }

  deleteCategory(category: categoriesList): void {
    category.deleted = true;
    this.categoriesService.deleteCategory(category.id)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(
        (res) => {
          this.modalMessages('success', 'Eliminar categoría', 'Categoría eliminado exitosamente.');
          this.getCategories();
        },
        (error) => {
          const content = this.constantService.getErrorsBack(error);
          this.modalMessages('error', 'Eliminar categoría', `No se pudo eliminar la categoría porque: ${content}`);
        }
      );
  }

  save(): void {
    if (this.loadingSearch) {
      return;
    }
    if (this.categorie.title.trim() == '') {
      this.modalMessages('info', 'Agregar categoría', 'El título de la categoría es requerido.')
      return;
    }
    this.loadingSearch = true;
    if (this.title == 'Actualizar categoría') {
      this.categoriesService.updateCategorie(this.categorie)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(
        (res) => {
          if (res) {
            this.modalMessages('success', 'Actualizar categoría', 'Categoría actualizada exitosamente.');
            this.categorie = { title: '', status: true, id: 0 };
          }
        },
        (error) => {
          const content = this.constantService.getErrorsBack(error);
          this.modalMessages('error', 'Actualizar categoría', `No se pudo actualizar la categoría porque: ${content}`);
          this.loadingSearch = false;
        },
        () => {
          this.loadingSearch = false;
          this.getCategories();
        }
      );
    } else {
      this.categoriesService.createCategorie(this.categorie)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(
        (res) => {
          if (res) {
            this.modalMessages('success', 'Agregar categoría', 'Categoría agregada exitosamente.');
            this.categorie = { title: '', status: true, id: 0 };
          }
        },
        (error) => {
          const content = this.constantService.getErrorsBack(error);
          this.modalMessages('error', 'Agregar categoría', `No se pudo agregador la categoría porque: ${content}`);
          this.loadingSearch = false;
        },
        () => {
          this.loadingSearch = false;
        }
      );
    }
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
