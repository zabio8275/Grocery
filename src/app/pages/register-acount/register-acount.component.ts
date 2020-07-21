import { AuthService } from './../../shared/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs/operators';

//phone number validation 
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-register-acount',
  templateUrl: './register-acount.component.html',
  styleUrls: ['./register-acount.component.scss']
})
export class RegisterAcountComponent implements OnInit {


  constructor(private auth: AuthService, public translate: TranslateService,private _router: Router) {}
  
  
  ngOnInit(): void {
  }


  returnToHomePage(){
    this._router.navigate(['home']);
  }


  //phone number 
  separateDialCode = true;
	SearchCountryField = SearchCountryField;
	TooltipLabel = TooltipLabel;
	CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.Switzerland, CountryISO.France];
  


	submitForm = new FormGroup({
    firstName: new FormControl(undefined, [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z_][a-zA-Z0-9_]*')]),
    lastName: new FormControl(undefined, [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z_][a-zA-Z0-9_]*')]),
    gender: new FormControl(undefined, [Validators.required]),
    birtDate: new FormControl(undefined, [Validators.required]),
    phone: new FormControl(undefined, [Validators.required]),
    email: new FormControl(undefined, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
    password: new FormControl(undefined, [Validators.required, , Validators.minLength(8)]),
    repeatePassword: new FormControl(undefined, [Validators.required, Validators.minLength(8)]),
    iAgree: new FormControl(undefined, [Validators.required]),
    
  });
  
  getTranslatedWord(word){
    let returnValue = null;
    this.translate.get(word).subscribe((res: string) => {
      returnValue = res;
    });
    return returnValue;
  }
  
  validatedForm(form, errElement){
    let elements  = form.controls;
    let password;
    let repeatePassword;
    let error_header = this.getTranslatedWord('sign_up_form_error_header');
    for(let i in elements){

      if(!elements[i].valid){

        let key = this.getTranslatedWord(`${i}`);

        if(elements[i].errors.required && i != 'repeatePassword' && i != "iAgree"){
          errElement.innerHTML = `
          <div class="alert alert-danger alert-dismissible fade show" role="alert">
          <h6 class="alert-heading">${error_header}</h6>
          <div>${key} ${this.getTranslatedWord('is_required')}</div>
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
          `;
        }
        if(elements[i].errors.pattern && (i != "phone" && i != "email")){
          errElement.innerHTML = `
          <div class="alert alert-danger alert-dismissible fade show" role="alert">
          <h6 class="alert-heading">${error_header}</h6>
          <div>${key} ${this.getTranslatedWord('should_not_start_with')} ${this.getTranslatedWord('number')}</div>
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
          `;
        }

        if(elements[i].errors.validatePhoneNumber && !elements[i].errors.required){
          errElement.innerHTML = `
          <div class="alert alert-danger alert-dismissible fade show" role="alert">
          <h6 class="alert-heading">${error_header}</h6>
          <div>${this.getTranslatedWord('enter')} ${this.getTranslatedWord('valide')} ${this.getTranslatedWord('phone_number')}</div>
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
          `;
        }
        if(elements[i].errors.pattern && i == "email"){
          errElement.innerHTML = `
          <div class="alert alert-danger alert-dismissible fade show" role="alert">
          <h6 class="alert-heading">${error_header}</h6>
          <div>${this.getTranslatedWord('enter')} ${this.getTranslatedWord('valide')} ${this.getTranslatedWord('email')}</div>
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
          `;
        }
        if(elements[i].errors.minlength){
          errElement.innerHTML = `
          <div class="alert alert-danger alert-dismissible fade show" role="alert">
          <h6 class="alert-heading">${error_header}</h6>
          <div>${key} ${this.getTranslatedWord('should_be_more_than')} ${elements[i].errors.minlength.requiredLength} ${this.getTranslatedWord('characters')}</div>
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
          `;
        }
        
        if(elements[i].errors.minlength && i == "repeatePassword"){
          errElement.innerHTML = `
          <div class="alert alert-danger alert-dismissible fade show" role="alert">
          <h6 class="alert-heading">${error_header}</h6>
          <div>${this.getTranslatedWord('password')} ${this.getTranslatedWord('should_be_more_than')} ${elements[i].errors.minlength.requiredLength} ${this.getTranslatedWord('characters')}</div>
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
          `;
        }


        
        
        if(elements[i].errors.required && i == 'repeatePassword'){
          errElement.innerHTML = `
          <div class="alert alert-danger alert-dismissible fade show" role="alert">
          <h6 class="alert-heading">${error_header}</h6>
          <div>${this.getTranslatedWord('repeate_your_password')} </div>
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
          `;
        }
        if(elements[i].errors.required &&  i == "iAgree"){
          errElement.innerHTML = `
          <div class="alert alert-danger alert-dismissible fade show" role="alert">
          <h6 class="alert-heading">${error_header}</h6>
          <div> ${this.getTranslatedWord('agree_terms_and_condition')}</div>
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
          `;
        }
        return false;
      }else {

        //check password
        
        if(i == "password"){
          password = elements[i].value;
        }

        if(i == "repeatePassword"){
          repeatePassword = elements[i].value;
        }


        if(password != undefined && repeatePassword != undefined){
          
          if(password != repeatePassword){
            errElement.innerHTML = `
          <div class="alert alert-danger alert-dismissible fade show" role="alert">
          <h6 class="alert-heading">${error_header}</h6>
          <div> ${this.getTranslatedWord('password_does_not_math')}</div>
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
          `;
          return false;
          }
          
        }
      }
    }    
  }
  submit(errElement){

    if(this.submitForm.valid){
      //submit form
      
      let {
        firstName, 
        lastName, 
        gender, 
        birtDate, 
        phone, 
        email, 
        password, 
        iAgree } = this.submitForm.controls;

        let signUpValues = {

          firstName : firstName.value,
          lastName : lastName.value,
          gender : gender.value,
          birtDate: birtDate.value.toString().split('00:00:00')[0].trim(),
          phone : phone.value.internationalNumber,
          email : email.value,
          password: password.value,
          iAgree : iAgree.value

        } 

        this.auth.signup(
          signUpValues.firstName, 
          signUpValues.lastName,
          signUpValues.gender,
          signUpValues.birtDate,
          signUpValues.phone,
          signUpValues.email,
          signUpValues.password,
          signUpValues.iAgree
          )
        .pipe(first())
        .subscribe(
          (result) => {
            //if a user registerd correctly 
            console.log(result);
          },
          (err) => {
            
            //if something happened 
            console.log(err);
          
          }
        );
    }else {


      // this.auth.login('kh241994@gmail.com', 'Digital2020')
      //   .pipe(first())
      //   .subscribe((result) => {console.log(result)}, (err)=> {console.log(err)});


      // this.auth.ProtectedAPI()
      //   .pipe(first())
      //   .subscribe((result) => {console.log(result)}, (err)=> {console.log(err)});

        
      this.validatedForm(this.submitForm,errElement);
    }
  }

}
