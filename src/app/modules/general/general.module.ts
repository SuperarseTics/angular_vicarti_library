import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import { ContainerOutline, FilterOutline, SortDescendingOutline, AppstoreOutline, DesktopOutline, MobileOutline } from '@ant-design/icons-angular/icons';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { GeneralRoutingModule } from './general-routing.module';
import { GeneralComponent } from './general/general.component';
import { MenuComponent } from './components/menu/menu.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { ReportsComponent } from './components/reports/reports.component';
import { AdministrativePanelComponent } from './components/administrative-panel/administrative-panel.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { ManagmentBooksComponent } from './components/administrative-panel/modules/managment-books/managment-books.component';
import { ReceiveBooksComponent } from './components/administrative-panel/modules/receive-books/receive-books.component';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { EmptyStatesComponent } from './components/empty-states/empty-states.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { LoadingPageComponent } from './components/loading-page/loading-page.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { ManagmentCategoriesComponent } from './components/administrative-panel/modules/managment-categories/managment-categories.component';
const icons: IconDefinition[] = [ ContainerOutline, FilterOutline, SortDescendingOutline, AppstoreOutline,DesktopOutline, MobileOutline ];

@NgModule({
  declarations: [
    GeneralComponent,
    MenuComponent,
    BooksListComponent,
    AdministrativePanelComponent,
    ReportsComponent,
    ReservationsComponent,
    ConfigurationComponent,
    ManagmentBooksComponent,
    ReceiveBooksComponent,
    EmptyStatesComponent,
    LoadingPageComponent,
    ManagmentCategoriesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    GeneralRoutingModule,
    NzIconModule,
    NzIconModule.forChild(icons),
    NzInputModule,
    NzAlertModule,
    NzSelectModule,
    NzDatePickerModule,
    NzCheckboxModule,
    NzDrawerModule,
    NzModalModule,
    NzSpinModule,
    NzSwitchModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  exports: [GeneralComponent]
})
export class GeneralModule { }
