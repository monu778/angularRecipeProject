import { Injectable,EventEmitter,Output } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  @Output() shoppingListEventEmitter = new EventEmitter<Ingredient[]>();
  shoppingListEditing = new Subject<number>();
  private ingredients:Ingredient [] = [
    new Ingredient('apple',5),
    new Ingredient('mango',10)
  ];

  constructor() { }

  getIngredient(index:number) {
    return this.ingredients[index];
  }
  

  getIngredients() {
    return this.ingredients.slice();
  }
  onIngredientAdded(ingredient){
    this.ingredients.push(ingredient)
    this.shoppingListEventEmitter.emit(this.ingredients.slice())
  }
  addIngredients(ingredients:Ingredient[]) {
    this.ingredients.push(...ingredients)
    this.shoppingListEventEmitter.emit(this.ingredients.slice())
    
  }
  onEditItem(index:number,newIngredient:Ingredient) {
    this.ingredients[index] = newIngredient;
    this.shoppingListEventEmitter.next(this.ingredients.slice())

  }
  onDeleteItem(index:number) {
    this.ingredients.splice(index,1);
    this.shoppingListEventEmitter.next(this.ingredients.slice())
  }
}
