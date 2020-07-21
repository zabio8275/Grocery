import { ValidationMessageComponent } from './pages/recovery/validation-message/validation-message.component';
import { RecoverEmailComponent } from './pages/recovery/recover-email/recover-email.component';
import { RecoverPasswordComponent } from './pages/recovery/recover-password/recover-password.component';
import { RegisterComponent } from './pages/register/register.component';
import { ConnectionComponent } from './pages/connection/connection.component';
import { RegisterAcountComponent } from './pages/register-acount/register-acount.component';
import { AuthGuard } from './shared/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { AddToCardComponent } from './layout/add-to-card/add-to-card.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent }, 
      { path: 'login', component: LoginComponent }, //after we should remove 
      { path: 'registerAcount', component: RegisterAcountComponent },
      { path: 'card', component: AddToCardComponent, canActivate:[AuthGuard]},
      { path: 'connection', component: ConnectionComponent},
      { path: 'register', component: RegisterComponent},
      { path: 'recoverEmail', component: RecoverEmailComponent},
      { path: 'resetPassword', component: RecoverPasswordComponent},
      { path: 'validate', component: ValidationMessageComponent},
      { path: '**', component: HomeComponent },

      //{ path: 'addToCard', component: AddToCardComponent, canActivate:[AuthGuard] }, 
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
