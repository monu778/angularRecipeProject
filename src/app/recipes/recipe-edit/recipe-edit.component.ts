import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { FormGroup,FormControl,FormArray, Validators } from '@angular/forms';
import { Recipe } from '../recipe.model';
import { relative } from 'path';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id:number;
  editMode = false;
  recipeForm:FormGroup;


  constructor( private route:ActivatedRoute, private recipeService:RecipeService,private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe((params:Params) => {
      this.id=+params['id'];
      this.editMode = params['id'] !=null;
      this.initForm();
    })
  }

  addIngred() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        "name":new FormControl(null,Validators.required),
        "amount":new FormControl(null,Validators.pattern(/^[0-9]+[1-9]*$/))
      })
    );
  }
  onCancel() {
    this.router.navigate(['../'],{relativeTo:this.route})
  }
  onSubmit() {
    const recipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']
    );
    if(this.editMode) {
      this.recipeService.updateRecipe(this.id,recipe)

    } else {
      console.log(recipe);
      this.recipeService.addRecipe(recipe)

    }
    this.onCancel();

  }

  delIngr(index:number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }
  initForm() {
    let recipeName:string='';
    let recipeImagePath="";
    let recipeDescription="";
    let recipeIngredients = new FormArray([]);

    if(this.editMode) {
      const recipe=this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe['ingredients']) {
        for(let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name':new FormControl(ingredient.name,Validators.required),
              'amount':new FormControl(ingredient.amount,Validators.pattern(/^[1-9]+[0-9]*$/))
            })
          );
        }
      }

    }

    this.recipeForm = new FormGroup({
      'name':new FormControl(recipeName,Validators.required),
      'imagePath':new FormControl(recipeImagePath,Validators.required),
      'description':new FormControl(recipeDescription,Validators.required),
      'ingredients':recipeIngredients
    })
  }

}
