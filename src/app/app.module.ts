import { ProductsService } from './shared/products.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import {HttpClient, HttpClientModule} from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { 
  NbThemeModule,
  NbLayoutModule,
  NbSidebarModule,
  NbButtonModule,
  NbContextMenuModule,
  NbMenuModule,
  NbUserModule, 
  NbIconModule, 
  NbSpinnerModule, 
  NbCardModule, 
  NbSearchModule, 
  NbActionsModule,
  NbDialogModule,
  NbInputModule,
  NbFormFieldModule,
  NbBadgeModule,
  NbSelectModule,
  NbAccordionModule,
  NbListModule,
  NbDatepickerModule,
  NbRadioModule,
  NbToastrModule,
  NbCheckboxModule,
  NbAlertModule,
} from '@nebular/theme';


// date-fns 
import { eo } from 'date-fns/locale';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { LandingComponent } from './pages/landing/landing.component';
import { HomeComponent } from './pages/home/home.component';
import { AddToCardComponent } from './layout/add-to-card/add-to-card.component';
import { LoginComponent } from './pages/login/login.component';


//auth 
import { AuthGuard } from './shared/auth.guard';
import { AuthService } from './shared/auth.service';
import { config } from 'rxjs';
export function tokenGetter() {
  return localStorage.getItem('access_token');
}

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterAcountComponent } from './pages/register-acount/register-acount.component';


//added for country number with flag
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { RecoverPasswordComponent } from './pages/recovery/recover-password/recover-password.component';
import { ConnectionComponent } from './pages/connection/connection.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecoverEmailComponent } from './pages/recovery/recover-email/recover-email.component';
import { ValidationMessageComponent } from './pages/recovery/validation-message/validation-message.component';







@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HomeComponent,
    AddToCardComponent,
    LoginComponent,
    RegisterAcountComponent,
    RecoverPasswordComponent,
    ConnectionComponent,
    RegisterComponent,
    RecoverEmailComponent,
    ValidationMessageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost3000'],
        blacklistedRoutes: ['localhost:3000/api/auth/signin']
      }
    }),
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbUserModule,
    NbEvaIconsModule,
    NbIconModule,
    NbSidebarModule.forRoot(), // NbSidebarModule.forRoot(), //if this is your app.module
    NbButtonModule,
    NbMenuModule.forRoot(),
    NbContextMenuModule,
    NbSpinnerModule,
    NbCardModule,
    NbSearchModule,
    NbActionsModule,
    NbDialogModule.forRoot(),
    NbInputModule,
    NbFormFieldModule,
    NbBadgeModule,
    NbSelectModule,
    NbAccordionModule,
    NbListModule,
    NbDatepickerModule.forRoot(),
    NbDateFnsDateModule.forRoot({
      parseOptions: { locale: eo },
      formatOptions: { locale: eo },
    }),
    NbRadioModule,
    NbToastrModule.forRoot(),
    NbCheckboxModule,
    NbAlertModule,
    
    //country number with flag

    BsDropdownModule.forRoot(),
    NgxIntlTelInputModule,
    
  ],
  providers: [
    AuthService,
    AuthGuard,
    ProductsService,
    NbDateFnsDateModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}


//AOT compiation support for translation
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
