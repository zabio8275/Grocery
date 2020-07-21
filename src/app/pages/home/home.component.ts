import { ProductsService } from './../../shared/products.service';
import { AuthService } from './../../shared/auth.service';
import { Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { NB_WINDOW, NbMenuService, NbSearchService, NbSidebarService } from '@nebular/theme';
import { filter, map } from 'rxjs/operators';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  // -------------------------------Menu items keys ----------------------
  menuItems = [
    { title: 'my cart' },
    { title: 'Profile' },
    { title: 'Logout' },
  ];

  allProducts;
  itemsInCard : any = 0;
  searchValue = '';
  constructor(
    private searchService: NbSearchService, 
    private nbMenuService: NbMenuService, @Inject(NB_WINDOW) 
    private window,
    private sidebarService: NbSidebarService,
    private _route: Router,
    public auth: AuthService,
    private productService: ProductsService
    ){

  // ------------------------ search all products -------------------------
    this.searchService.onSearchSubmit()
      .subscribe((data: any) => {
        this.searchValue = data.term;
    });


    // --------------------------- calculate card Items if exits --------------
    let itemsInCard = this.calculLocalCardItems();
    if(itemsInCard != false){ 
      this.itemsInCard = itemsInCard;
    }
  }

  
  // ------------------------------- handled logged user account -----------------------
  ngOnInit() {




    // ----------------- init slider ------------------

      // new Glider(document.getElementById('glider-double'), {
      //   slidesToShow: 5,
      //   slidesToScroll: 5,
      //   draggable: true,
      //   dots: '#dots2',
      //   arrows: {
      //     prev: '#glider-prev-2',
      //     next: '#glider-next-2'
      //   }
      // })

    

    // ----------------- init slider ------------------

    this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'my-context-menu'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => {;
        switch(title) {
          case 'my cart':
            this._route.navigate(['card']);
            break;
          case 'Profile': 
            this._route.navigate(['profile']);
            break; 
          case 'Logout':
            this.auth.logout();
            break; 
        }
      });



      // ------------- here we call get ALl products --------------------
      this.getAllProducts();




  }

  // --------------- Category  ---------------------- 

  getAllProducts(){
    this.productService.getAllProducts()
      .subscribe((result) => {
        this.allProducts = result;
      });
  }
  getAllDiscountedProducts(){
    this.productService.getAllDiscountedProducts()
      .subscribe((result) => {
        this.allProducts = result;
      });
  }

  getAllNewProducts(){
    this.productService.getAllNewProducts()
      .subscribe((result) => {
        this.allProducts = result;
      });
  }
  getAllOrganicProducts(){

  }
  getALlFestiveProducts(){

  }
  
  

 
  // ----------------- login or signup
  connection() {
    this._route.navigate(['login']);
  }

  // ------------------default language (en : 1, fr : 2) --------------------------------
  defaultLanuage = '1'; 


  // --------------------- TOGGLE SIDBAR NAV ----------------------------------
  toggle() {
    this.sidebarService.toggle(false, 'left');
  }


   
  addition(elm, productId){

    //we have to check if product is availibale in other qty 
    let unit = parseInt(elm.innerHTML);
    unit++;
    elm.innerHTML = unit;
  }
  minus(elm){
    let unit = parseInt(elm.innerHTML);
    if(unit > 1){
      unit--;
      elm.innerHTML = unit;
    }
  }


  calculPrice(unitelm, price){
    let unit = parseInt(unitelm.innerHTML);
    return unit * price;
  }



  goToCard(){

    this._route.navigate(['card']);
  }



  getlocaCard(){
    let card = localStorage.getItem('card');
  }

  calculLocalCardItems(){
    let card = localStorage.getItem('card');
    if(card){
      card = JSON.parse(card);
      return card.length;
    }
    else return false;
  }


  setLocalCard(productId, qty ){

    if(localStorage.getItem('card')){

      let card = JSON.parse(localStorage.getItem('card'));
      //we have to find if already Exists or not 
      let itemExists = card.find(c => c.productId === productId);
      
      if(itemExists){
        //item exists in the card 
        const storageIndex = card.indexOf(itemExists);
        card[storageIndex].qty += qty;
        localStorage.setItem('card',JSON.stringify(card));

      }else {

        //item doesnot exists 
        let newItem = {"productId": productId, "qty" : qty, productLiked: false};
        card.push(newItem);
        localStorage.setItem('card', JSON.stringify(card));
        this.itemsInCard = this.calculLocalCardItems();

      }

    }else {
      let card = [{"productId": productId, "qty" : qty}];
      localStorage.setItem('card',JSON.stringify(card));
    }
    
  }




  addToCard(unitelm, productId){
    let unit = parseInt(unitelm.innerHTML);
    this.setLocalCard(productId, unit);
    this.getlocaCard();
  }


  

}
