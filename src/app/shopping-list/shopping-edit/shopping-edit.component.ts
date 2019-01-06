import { Component, OnInit,OnDestroy,ViewChild,EventEmitter,ElementRef,Output } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Form, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  @ViewChild('nameInput') nameInputRef:ElementRef;
  @ViewChild('amountInput') amountInputRef:ElementRef;
  @ViewChild('f') slsForm:NgForm
  
 // @Output() ingredientAdded = new EventEmitter<Ingredient>();
 subscription:Subscription
 editMode=false;
 editItemIndex:number;
 editItem:Ingredient

  constructor(private slsService:ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slsService.shoppingListEditing.subscribe(
      (index:number) => {
        this.editItemIndex = index;
        this.editMode = true
        this.editItem =this.slsService.getIngredient(index)
        this.slsForm.setValue({
        name:this.editItem.name,
        amount:this.editItem.amount
       })
      }
    )
  }
  onAddItem() {
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(ingName,ingAmount)
    this.slsService.onIngredientAdded(newIngredient)
   // this.ingredientAdded.emit(newIngredient)
  }
  addForm(form:NgForm) {
    const newIngredient = new Ingredient(form.value.name,form.value.amount)
    if(this.editMode) {
      this.slsService.onEditItem(this.editItemIndex,newIngredient)
    } else {
      console.log("dsfdsf");
      this.slsService.onIngredientAdded(newIngredient)
    }
    this.editMode=false;
    form.reset();

  }
  onClear() {
    this.slsForm.reset();
    this.editMode=false;
  }
  onDelete() {
    this.slsService.onDeleteItem(this.editItemIndex)
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();

  }

}
