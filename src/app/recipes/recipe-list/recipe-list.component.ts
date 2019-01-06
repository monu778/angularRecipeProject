import { Component, OnInit,EventEmitter,Output, OnDestroy } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy{
  @Output() recipeWasSelected = new EventEmitter<Recipe>()
  receips:Recipe[]
  subscription:Subscription
 /* receips:Recipe[] = [
    new Recipe("first recipe","good description","https://images.media-allrecipes.com/userphotos/300x300/5775177.jpg"),
    new Recipe("second recipe","good description","https://images.media-allrecipes.com/userphotos/300x300/5775177.jpg")
  ]*/
  constructor(private recipeService:RecipeService,
    private route:ActivatedRoute,  private router:Router) { }

  selectedRecipe(recipe:Recipe) {
    this.recipeWasSelected.emit(recipe)
  }
  ngOnInit() {
    this.receips = this.recipeService.getReceipes()
    this.subscription = this.recipeService.recipesChanged.subscribe((recipes:Recipe[])=>{
      this.receips = recipes;
    });
    
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  addNewRecipe() {
    this.router.navigate(['new'],{'relativeTo':this.route})
  }

}
