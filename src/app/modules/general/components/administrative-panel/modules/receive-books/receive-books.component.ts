import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subject, takeUntil } from 'rxjs';
import { resevesShow } from 'src/app/modules/general/models/general.type';
import { ReservationsService } from 'src/app/modules/general/services/reservations.service';
import { ConstantService } from 'src/app/modules/providers/constant.service';

@Component({
  selector: 'app-receive-books',
  templateUrl: './receive-books.component.html',
  styleUrls: ['./receive-books.component.scss']
})
export class ReceiveBooksComponent implements OnInit {

  public reservation_code: string = '';
  public loadingSearch: boolean = false;
  public data: any | null = null;
  public keysData: { title: string, key: string }[] = [
    { title: 'Usuario', key: 'user' },
    { title: 'Título del libro', key: 'book_title' },
    { title: 'Código del libro', key: 'book_code' },
    { title: 'Categoría del libro', key: 'book_category' },
    { title: 'Fecha de reserva', key: 'booking_date' },
    { title: 'Fecha de entrega', key: 'delivery_date' },
    { title: 'Fecha de devolución', key: 'giveback_date' },
    { title: 'Fecha máxima de devolución', key: 'last_giveback_date' },
    { title: 'Estado', key: 'status' },
  ];

  public styleGridTable: string = 'grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;';

  public loadingDelivery: boolean = false;
  public loadingGiveBack: boolean = false;

  private unsubscribeAll: Subject<any> = new Subject<any>();


  constructor(
    private modalService: NzModalService,
    private reservationsService: ReservationsService,
    private constantService: ConstantService,
  ) { }

  ngOnInit() {
  }

  search(): void {
    if (this.loadingSearch) {
      return;
    }
    if (this.reservation_code == '') {
      this.modalMessages('error', 'Buscar reserva', 'No se pudo buscar la reserva porque: <br>»El código de reserva es obligatorio')
      return;
    }
    this.loadingSearch = true;
    this.reservationsService.showReservation(this.reservation_code)
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe(
      (res) => {
        this.data = res.data;
      },
      (error) => {
        const content = this.constantService.getErrorsBack(error);
        this.modalMessages('error', 'Buscar reserva', `No se pudo buscar la reserva porque: ${content}`);
        this.loadingSearch = false;
      },
      () => {
        this.loadingSearch = false;
      }
    )
  }

  delivery(): void {
    if (this.loadingDelivery) {
      return;
    }
    if (this.reservation_code == '') {
      this.modalMessages('error', 'Realizar entrega', 'No se pudo realizar la entrega porque: <br>»El código de reserva es obligatorio')
      return;
    }
    this.loadingDelivery = true;
    this.reservationsService.makeDelivery({ booking_code : this.reservation_code })
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe(
      (res) => {
        this.data = res.data;
        this.modalMessages('success', 'Realizar entrega', res.message);
      },
      (error) => {
        const content = this.constantService.getErrorsBack(error);
        this.modalMessages('error', 'Realizar entrega', `No se pudo realizar la entrega porque: ${content}`);
        this.loadingDelivery = false;
      },
      () => {
        // this.data = null;
        this.loadingDelivery = false;
      }
    )
  }

  gveBack(): void {
    if (this.loadingGiveBack) {
      return;
    }
    if (this.reservation_code == '') {
      this.modalMessages('error', 'Realizar devolución', 'No se pudo realizar la devolución porque: <br>»El código de reserva es obligatorio')
      return;
    }
    this.loadingGiveBack = true;
    this.reservationsService.makeGiveBack({ booking_code : this.reservation_code })
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe(
      (res) => {
        this.data = res.data;
        this.modalMessages('success', 'Realizar devolución', res.message);
      },
      (error) => {
        const content = this.constantService.getErrorsBack(error);
        this.modalMessages('error', 'Realizar devolución', `No se pudo realizar la devolución porque: ${content}`);
        this.loadingGiveBack = false;
      },
      () => {
        // this.data = null;
        this.loadingGiveBack = false;
      }
    )
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
