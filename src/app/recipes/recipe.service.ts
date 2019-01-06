import { Injectable,EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model'
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  recipeSelectedServiceEvent = new EventEmitter<Recipe>();
  private receips:Recipe[] = [
    new Recipe("first recipe","good description","https://images.media-allrecipes.com/userphotos/300x300/5775177.jpg",
    [new Ingredient('meat',1),new Ingredient('veg',1),new Ingredient('fish',1)]),
    new Recipe("second recipe","good description","https://images.media-allrecipes.com/userphotos/300x300/5775177.jpg",
  [[new Ingredient('tyy',1),new Ingredient('vjjeg',1),new Ingredient('fkjish',1)]])
  ]

  constructor(private shoppingListService:ShoppingListService) { }

  getReceipes() {
    return this.receips.slice();
  }
  getRecipe(id:number) {
    return this.receips[id];
  }
  addIngredientsToShoppingList(ingredients:Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients)
  }
  addRecipe(recipe:Recipe) {
    this.receips.push(recipe);
    this.recipesChanged.next(this.receips.slice())
  }
  updateRecipe(index:number,recipe:Recipe) {
    this.receips[index] = recipe;
  }
  deleteRecipe(index:number) {
    this.receips.splice(index,1);
    this.recipesChanged.next(this.receips.slice())
  }
}
