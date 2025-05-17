import { ConstantService } from 'src/app/modules/providers/constant.service';
import { Component, Input, OnInit } from '@angular/core';
import { ChartsOptionsService } from 'src/app/modules/providers/charts.service';
import { dataChart } from '../../models/general.type';
import { ReportsService } from '../../services/reports.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  public report_cards: {
    books: {
      title: string,
      amount: number,
    },
    categories: {
      title: string,
      amount: number,
    },
    reservations: {
      title: string,
      amount: number,
    },
    returns: {
      title: string,
      amount: number,
    },
  } = {
    books: {
      title: 'Libros',
      amount: 0,
    },
    categories: {
      title: 'Categorías',
      amount: 0,
    },
    reservations: {
      title: 'Reservaciones',
      amount: 0,
    },
    returns: {
      title: 'Devoluciones pendientes',
      amount: 0,
    },
  }

  public dataPie: dataChart[] = [];
  public dataTopReservations: dataChart[] = [];
  public dataReservationsPerMonth: dataChart[] = [];

  public optionCirleChart: any;
  public topReservationBooksChart: any;
  public reservationPerMonthChart: any;

  @Input() public max_height!: number;
  public loading: boolean = false;
  // public max_height: number = 500;
  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private chartsOptionsService: ChartsOptionsService,
    private reportsService: ReportsService,
    private constantService: ConstantService,
  ) { }

  ngOnInit() {
    this.getReport();
    // this.generateData();
    // this.optionCirleChart =this.chartsOptionsService.buildClassicPieChart(this.dataPie);
    // this.topReservationBooksChart =this.chartsOptionsService.buildClassicBarChart(this.dataTopReservations, 'Número de reservas', '#C2A3FF');
    // this.reservationPerMonthChart =this.chartsOptionsService.buildClassicBarChart(this.dataReservationsPerMonth, 'Reservas', '#93D9D9');
  }

  generateDataBooksPerCategory(booksPerCategory: any): void {
    this.dataPie = [];
    const keys = Object.keys(booksPerCategory);
    keys.forEach(key => {
      this.dataPie.push({
        name: key,
        value: booksPerCategory[key]
      });
    });
    const maxValue = Math.max(...this.dataPie.map(obj => obj.value));
    if (maxValue == 0) this.dataPie = [];
    this.optionCirleChart =this.chartsOptionsService.buildClassicPieChart(this.dataPie);
  }

  generateDataReservationsPerMonth(reservationsPerMonth: any): void {
    this.dataReservationsPerMonth = [];
    const keys = Object.keys(reservationsPerMonth);
    keys.forEach(key => {
      this.dataReservationsPerMonth.push({
        name: key,
        value: reservationsPerMonth[key]
      });
    });
    const maxValue = Math.max(...this.dataReservationsPerMonth.map(obj => obj.value));
    if (maxValue == 0) this.dataReservationsPerMonth = [];
    this.reservationPerMonthChart =this.chartsOptionsService.buildClassicBarChart(this.dataReservationsPerMonth, 'Reservas', '#93D9D9');
  }

  generateDataTopReservedBooks(topReservedBooks: { title: string, reservations: number }[]): void {
    this.dataTopReservations = topReservedBooks.map(item => {
      return {
        name: item.title,
        value: item.reservations
      }
    });
    const maxValue = Math.max(...this.dataTopReservations.map(obj => obj.value));
    if (maxValue == 0) this.dataTopReservations = [];
    this.topReservationBooksChart =this.chartsOptionsService.buildClassicBarChart(this.dataTopReservations, 'Número de reservas', '#C2A3FF');
  }

  getReport(): void {
    this.loading = true;
    this.reportsService.getReport()
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe(
      (res) => {
        this.report_cards.books.amount = res.books;
        this.report_cards.reservations.amount = res.bookings;
        this.report_cards.categories.amount = res.categories;
        this.report_cards.returns.amount = res.notGiveBack;
        this.generateDataBooksPerCategory(res.booksPerCategory);
        this.generateDataTopReservedBooks(res.topReservedBooks);
        this.generateDataReservationsPerMonth(res.reservationsPerMonth);
      },
      (error) => {
        this.loading = false;
        this.constantService.getErrorsBack(error);
      },
      () => {
        this.loading = false;
      }
    )
  }

}
