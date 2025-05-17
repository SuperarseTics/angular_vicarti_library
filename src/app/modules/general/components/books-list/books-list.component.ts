import { ConstantService } from 'src/app/modules/providers/constant.service';
import { Component, Input, OnInit } from '@angular/core';
import { bookList, bookListFilters } from '../../models/general.type';
import { Subject, takeUntil } from 'rxjs';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {

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

  public filterSelect: { authors: string[], titles: string[], publication: number[], categories: string[], edition:string[] } = {
    authors: [],
    titles: [],
    publication: [],
    categories: [],
    edition: [],
  }

  @Input() public max_height!: number;

  public book_list: bookList[] = [];
  public loading: boolean = false;
  public blockPrevPage: boolean = false;
  public blockNextPage: boolean = false;

  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private booksService: BooksService,
    private constantService: ConstantService,
  ) { }

  ngOnInit() {
    this.getBookList();
    this.getFilters();
  }

  getBookList(): void {
    // this.book_list = [];
    this.loading = true;
    this.booksService.getBookList(this.filters)
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe(
      (res) => {
        if (res) {
          this.book_list = res.data;
          this.blockPrevPage = res.meta.current_page == 1;
          this.blockNextPage = res.meta.current_page == res.meta.last_page;
        }
      },
      (error) => {
        this.constantService.getErrorsBack(error);
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  managmentPages(type: 'next' | 'prev'): void {
    if (type == 'next') {
      if (!this.blockNextPage) {
        this.filters.page ++;
        this.getBookList();
      }
    } else {
      if (!this.blockPrevPage) {
        this.filters.page --;
        this.getBookList();
      }
    }
  }

  getFilters(): void {
    this.booksService.getBooksFilters()
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe(
      (res) => {
        if (res) {
          this.filterSelect.authors = res.data.authors;
          this.filterSelect.titles = res.data.titles;
          this.filterSelect.publication = res.data.publication;
          this.filterSelect.categories = res.data.categories;
          this.filterSelect.edition = res.data.edition;
        }
      },
      (error) => {
        this.constantService.getErrorsBack(error);
      }
    );
  }

}
