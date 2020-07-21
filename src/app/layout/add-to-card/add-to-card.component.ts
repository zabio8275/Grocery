import { ProductsService } from './../../shared/products.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-add-to-card',
  templateUrl: './add-to-card.component.html',
  styleUrls: ['./add-to-card.component.scss']
})
export class AddToCardComponent implements OnInit {

  
  constructor(
    private _router: Router, 
    private _ProductsService: ProductsService
    ) { }

  card = [];

  ngOnInit(): void { 
   
    let localcard = JSON.parse(localStorage.getItem('card'));
    localcard.forEach(item => {
      
      this._ProductsService.getProductById(item.productId)
      .pipe(first())
      .subscribe(result => {

        this.card.push({
          ProductId: result[0].id,
          productName: result[0].name,
          productDescription: result[0].weigth, 
          productImage :result[0].imageUrls,
          productPrice: result[0].price - (result[0].price * result[0].saleAmount /100),
          productQty: item.qty,
          productLiked: item.productLiked 

        });
      });
      
    });

  }

  increaseQTY(id){


    //increaseQTY from local storage
    let storageCard = JSON.parse(localStorage.getItem('card'));
    const storageItem = storageCard.find(c => c.productId === id);
    const storageIndex = storageCard.indexOf(storageItem);
    storageCard[storageIndex].qty++;
    localStorage.setItem('card',JSON.stringify(storageCard));

    //check product availability in the back-end 
    const item = this.card.find(c => c.ProductId === id);
		const index = this.card.indexOf(item);
    this.card[index].productQty++;

  }

  descreaseQTY(id){

    //descreaseQTY from local storage
    let storageCard = JSON.parse(localStorage.getItem('card'));
    const storageItem = storageCard.find(c => c.productId === id);
    const storageIndex = storageCard.indexOf(storageItem);


    if(storageCard[storageIndex].qty > 1){
      storageCard[storageIndex].qty--;
    }
    localStorage.setItem('card',JSON.stringify(storageCard));

    //decrease from card
    const item = this.card.find(c => c.ProductId === id);
		const index = this.card.indexOf(item);
    if(this.card[index].productQty > 1){
      this.card[index].productQty--;
    }

  }

  removeItem(id){


    //remove from local Storage
    let card = JSON.parse(localStorage.getItem('card'));
    let cardItem = card.find(c => c.ProductId === id);
    let cardIndex = card.indexOf(cardItem);
    card.splice(cardIndex,1);
    localStorage.setItem('card',JSON.stringify(card));
    
    //remove from list
    let item = this.card.find(c => c.ProductId === id);
		const index = this.card.indexOf(item);
    this.card.splice(index,1);
    
  }

  likeItem(id){
    
    //likeItem in local Storage
    let card = JSON.parse(localStorage.getItem('card'));
    let cardItem = card.find(c => c.productId === id);
    let cardIndex = card.indexOf(cardItem);
    card[cardIndex].productLiked = !card[cardIndex].productLiked;
    localStorage.setItem('card',JSON.stringify(card));


    //likeItem in card
    const item = this.card.find(c => c.ProductId === id);
		const index = this.card.indexOf(item);
    this.card[index].productLiked = !this.card[index].productLiked;
  }


  totalPrice(){

    let total = 0;
    this.card.forEach(item => {
      
      total += item.productPrice * item.productQty;

    });

    return total;
  }

  goToHome(){

    this._router.navigate(['home']);
  }


}
