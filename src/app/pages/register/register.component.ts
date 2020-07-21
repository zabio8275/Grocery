import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }



  showCountryCode(countryList, $event){

    $event.target.classList.toggle('toggleSpiner');
    countryList.classList.toggle('countryToggleDisplay');
    
  }

  showCountryCodeUpdate(countryInput, $event){
    countryInput.innerHTML = $event.target.childNodes[1].innerText;
    $event.path[2].classList.remove('countryToggleDisplay');
  }
}
