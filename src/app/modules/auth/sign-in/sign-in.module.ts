import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import { ContainerOutline, FilterOutline, SortDescendingOutline, AppstoreOutline, DesktopOutline, MobileOutline } from '@ant-design/icons-angular/icons';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { SignInComponent } from './sign-in.component';
import { SignInRoutingModule } from './sign-in-routing.module';
import { NzAlertModule } from 'ng-zorro-antd/alert';
const icons: IconDefinition[] = [ ContainerOutline, FilterOutline, SortDescendingOutline, AppstoreOutline,DesktopOutline, MobileOutline ];

@NgModule({
  declarations: [
    SignInComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SignInRoutingModule,
    NzIconModule,
    NzIconModule.forChild(icons),
    NzInputModule,
    NzAlertModule,
  ],
  exports: [SignInComponent]
})
export class SignInModule { }
