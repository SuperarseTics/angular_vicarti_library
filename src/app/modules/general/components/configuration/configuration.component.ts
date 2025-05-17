import { Component, Input, OnInit } from '@angular/core';
import { ConfigurationService } from '../../services/configuration.service';
import { Subject, takeUntil } from 'rxjs';
import { configurations, NotificationsPropieties, SystemPropieties } from '../../models/general.type';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ConstantService } from 'src/app/modules/providers/constant.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {
  @Input() public max_height!: number;

  public system: SystemPropieties = {
    max_loan_days: 0,
    max_loan_books: 0
  }

  public notifications: NotificationsPropieties = {
    email: '',
    last_day: false,
    days_advance: 0
  }

  public rules: string[] = [
    '',
    '',
    '',
    '',
    '',
    '',
  ]

  public loading: boolean = false;
  public loadingSave: boolean = false;

  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private configurationService: ConfigurationService,
    private constantService: ConstantService,
    private modalService: NzModalService,
  ) { }

  ngOnInit() {
    this.getConfigurations();

  }

  getConfigurations(): void {
    this.loading = true;
    this.configurationService.getConfigurqations()
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe(
      (res) => {
        this.getInformation(res);
      },
      (error) => {
        this.loading = false;
        this.constantService.getErrorsBack(error);
      },
      () => {
        this.loading = false;
      }
    );
  }

  save(): void {
    if (this.loadingSave) {
      return;
    }
    let rules: any = {};
    let rules_array = this.rules.filter(item => item != '');
    rules_array.forEach((item, index) => {
      rules[index] = item;
    });
    const data = {
      system: this.system,
      notifications: this.notifications,
      rules: rules
    }
    this.loadingSave = true;
    this.configurationService.updateConfigurations(data)
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe(
      (res) => {
        this.modalMessages('success', 'Configuración', 'Configuraciones actualizadas con éxito.');
      },
      (error) => {
        const content = this.constantService.getErrorsBack(error);
        this.modalMessages('error', 'Configuración', `No se pudo actualizar las configuraciones porque: ${content}`);
        this.loadingSave = false;
      },
      () => {
        this.loadingSave = false;
      }
    );
  }

  getInformation(res: { data: configurations[] }): void {
    const systemPropieties = res.data.find(item => item.section == 'system');
    const notificationPropieties = res.data.find(item => item.section == 'notifications');
    const rulesPropieties = res.data.find(item => item.section == 'rules');
    if (systemPropieties) this.system = systemPropieties.properties as SystemPropieties;
    if (notificationPropieties) this.notifications = notificationPropieties.properties as NotificationsPropieties;
    if (rulesPropieties) this.rules = rulesPropieties.properties as string[];
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
