import { Component, OnInit } from '@angular/core';
import { filtersCategory, historyReservation, resevesHistory } from '../../models/general.type';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ReservationsService } from '../../services/reservations.service';
import { Subject, takeUntil } from 'rxjs';
import { ConstantService } from 'src/app/modules/providers/constant.service';
import { ConfigurationService } from '../../services/configuration.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {
  public breadcrum: { from: string, to: string } = { from: 'Inicio', to: 'Panel de reservas' };
  public title: string = 'Panel de reservas';
  public menu: { title: string, image: string, description: string }[] = [
    {
      title: 'Reservar',
      image: 'assets/pages/reservations/reservas.png',
      description: 'Gestiona la reserva de tu libro'
    },
    {
      title: 'Historial',
      image: 'assets/pages/reservations/historial.png',
      description: 'Observa todas tus reservas y conoce sus estados'
    },
  ];

  public styleGridTable: string = 'grid-template-columns: 2fr 1fr 1fr 1fr 2fr 2fr 2fr 1fr;';
  public history_list: resevesHistory[] = [];

  public filterCategories: filtersCategory = {
    page: 1,
    size: 5,
    order: 'booking_date',
    sort: 'asc',
  }
  public blockPrevPage: boolean = false;
  public blockNextPage: boolean = false;

  public reservation: { book_code: string, pickup_date: any, regulation_check: boolean } = {
    book_code: '',
    pickup_date: null,
    // delivery_date: null,
    regulation_check: false
  }

  public errors_message: string[] = [];
  public show_modal: boolean = false;
  public loadingSave: boolean = false;
  public loading: boolean = false;
  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private modalService: NzModalService,
    private reservationsService: ReservationsService,
    private configurationService: ConfigurationService,
    public constantService: ConstantService,
  ) { }

  ngOnInit() {
    this.getHistory();
  }

  getHistory(): void {
    this.loading = true;
    this.reservationsService.historyList(this.filterCategories)
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe(
      (res) => {
        this.history_list = res.data;
        this.blockPrevPage = res.meta.current_page == 1;
        this.blockNextPage = res.meta.current_page == res.meta.last_page;
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

  managmentPages(type: 'next' | 'prev'): void {
    if (type == 'next') {
      if (!this.blockNextPage) {
        this.filterCategories.page ++;
        this.getHistory();
      }
    } else {
      if (!this.blockPrevPage) {
        this.filterCategories.page --;
        this.getHistory();
      }
    }
  }

  selectOptionMenu(title: string): void {
    if (title == 'Inicio') {
      return;
    }
    this.title = title;
    this.breadcrum = { from: title != 'Panel de reservas' ? 'Panel de reservas' : 'Inicio', to: title };
  }

  // generateData(): void {
  //   this.history_list = []
  //   for (let index = 1; index < 6; index++) {
  //     this.history_list.push({
  //       code: '001',
  //       title: 'Titulo ' + index,
  //       reservation_date: '2024-12-0' + index,
  //       delivery_date: '2024-12-0' + index,
  //       status: 'Entregado'
  //     })
  //   }
  // }

  openRules(): void {
    this.configurationService.getRules()
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe(
      (res) => {
        let message: string = '';
        res.data.forEach((item, index) => {
          if (item && item != '') {
            message += index == 0 ? '»' + item : '<br>»' + item
          }
        });
        this.modalMessages('info', 'Reglas', message)
      },
      (error) => {
        this.constantService.getErrorsBack(error);
      },
      () => {
        this.show_modal = true;
      }
    )
  }

  save(): void {
    if (this.loadingSave) {
      return;
    }
    this.checkReservation();
    if (this.errors_message.length > 0) {
      let title: string = 'Solicitar reserva';
      let content: string = `No se pudo solicitar reserva porque: <br>»${this.errors_message.join('<br>»')}`;
      this.modalMessages('error', title, content);
      return;
    }
    if (!this.show_modal) {
      let title: string = 'Solicitar reserva';
      this.modalMessages('error', title, 'Cargando reglas');
      return;
    }
    const data = {
      book_code: this.reservation.book_code,
      booking_date: this.reservation.pickup_date,
      // delivery_date: this.reservation.delivery_date
    }
    this.loadingSave = true;

    this.reservationsService.makeReservation(data)
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe(
      (res) => {
        this.modalMessages('success', 'Solicitar reserva', 'Solicitud hecha exitosamente.');
      },
      (error) => {
        const content = this.constantService.getErrorsBack(error);
        this.modalMessages('error', 'Solicitar reserva', `No se pudo realizar la reserva porque: ${content}`);
        this.loadingSave = false;
      },
      () => {
        this.loadingSave = false;
        this.show_modal = false;
        this.reservation = {
          book_code: '',
          pickup_date: null,
          regulation_check: false
        };
        this.getHistory();
      }
    );
  }

  checkReservation(): void {
    this.errors_message = [];
    if (this.reservation.book_code == '') {
      this.errors_message.push('El código del libro es obligatorio')
    }
    if (this.reservation.pickup_date == null) {
      this.errors_message.push('La fecha para retirar es obligatoria')
    }
    // if (this.reservation.delivery_date == null) {
    //   this.errors_message.push('La fecha para entregar es obligatoria')
    // }
    if (!this.reservation.regulation_check) {
      this.errors_message.push('Debe aceptar el reglamento')
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

  onCheckboxChange(): void {
    if (this.reservation.regulation_check) {
      this.openRules();
    }
  }
}
