import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ingredient} from '../shared/ingredient.model'
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients:Ingredient[];
  
  constructor(private shoppingListService:ShoppingListService) { }

  onEditItem(index:number) {
    this.shoppingListService.shoppingListEditing.next(index);

  }

  
  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.shoppingListService.shoppingListEventEmitter.subscribe((ingredients:Ingredient[])=>{
    this.ingredients = ingredients;

  })

  }
  
  

}
