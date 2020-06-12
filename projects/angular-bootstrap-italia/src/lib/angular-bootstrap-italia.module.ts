import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Template
import { HeaderComponent } from './template/header/header.component';
import { FooterComponent } from './template/footer/footer.component';
import { HeaderNavbarComponent } from './template/header/header-navbar/header-navbar.component';
import { HeaderNavbarDropdownComponent } from './template/header/header-navbar/header-navbar-dropdown/header-navbar-dropdown.component';

// Pages
import { BlankPageComponent } from './pages/blank-page/blank-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ResetPasswordPageComponent } from './pages/reset-password-page/reset-password-page.component';

// Components
import { TableComponent } from './components/table/table.component';
import { SearchModalComponent } from './components/search-modal/search-modal.component';
import { TablePaginationComponent } from './components/table/table-pagination/table-pagination.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { DialogComponent } from './components/dialog/dialog.component';

// Modules
import { DynamicFormModule } from './components/dynamic-form/dynamic-form.module';
import { LeafletModule } from './components/leaflet/leaflet.module';
import { TimelineComponent } from './components/timeline/timeline.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    BlankPageComponent,
    LoginPageComponent,
    ResetPasswordPageComponent,
    SearchModalComponent,
    HeaderNavbarComponent,
    HeaderNavbarDropdownComponent,
    TableComponent,
    TablePaginationComponent,
    StepperComponent,
    DialogComponent,
    TimelineComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    DynamicFormModule,
    LeafletModule,
  ],
  exports: [
    DynamicFormModule,
    LeafletModule,
    HeaderComponent,
    FooterComponent,
    BlankPageComponent,
    LoginPageComponent,
    ResetPasswordPageComponent,
    TableComponent,
    SearchModalComponent,
    StepperComponent,
    DialogComponent,
    TimelineComponent
  ]
})
export class AngularBootstrapItaliaModule { }
