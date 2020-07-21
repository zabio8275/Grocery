import { Component } from '@angular/core';
import { AuthService } from './../../shared/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public username: string;
  public password: string;
  public error: string;

  constructor(private auth: AuthService, private router: Router) { }




  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
    password: new FormControl('', Validators.required),   
  });

  public submit(errorBox, lostyourPasswordBox) {

    let form = this.loginForm;
    if(!form.valid){
      
      if(
        (form.get('email').invalid && form.get('password').invalid ) && 
         form.get('email').errors.required &&
         form.get('password').errors.required){
        errorBox.innerHTML = `
          <div class="alert alert alert-dismissible">
            <strong>REQUIRED !</strong>
            email and password are required
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          </div>
        `;       
        return;
      }
      
      if(form.get('email').invalid && form.get('email').errors.required){
        errorBox.innerHTML = `
          <div class="alert alert alert-dismissible">
            <strong>REQUIRED !</strong>
            email is required
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          </div>
        `;  
        return;
      }

      if(form.get('email').invalid && form.get('email').errors.pattern){
        errorBox.innerHTML = `
          <div class="alert alert alert-dismissible">
            <strong>REQUIRED !</strong>
            Enter a valid Email
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          </div>
        `;  
        return;
      }
      if(form.get('password').invalid && form.get('password').errors.required){
        errorBox.innerHTML = `
          <div class="alert alert alert-dismissible">
            <strong>REQUIRED !</strong>
            Password is required
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          </div>
        `;  
        return;
      }
    }else {

      //login form is valid ready to login

      let userMail = form.get('email').value;
      let userPassword = form.get('password').value;

      // this.auth.login('kh241994@gmail.com', 'Digital2020')
      this.auth.login(userMail, userPassword).subscribe(result => {

        if(result == true){

          //navigate to home 
          this.router.navigate(['home']);

        }else {

          if(result.returnCode === 'INVALIDE_AUTH_KEY') {
            errorBox.innerHTML = `
            <div class="alert alert alert-dismissible">
              <strong>AUTHENTICATION FAILED!</strong>
              Email or Password is incorrect !
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            </div>
          `;
          
          lostyourPasswordBox.innerHTML = `
            <a href="/#/registerAcount" class="lostPassword" style="color:red;text-decoration: none;"> Lost your Password ?</a>
            `;
          return;
          }
        }
      });
    }

    
  }
}
