import { Component, OnInit,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
@Output() startGame=new EventEmitter<number>();
@Output() stopGame=new EventEmitter<number>();
 n:Number;
  constructor() { 
    this.n=0;
  }
  startEvent(number) {
    this.startGame.emit(this.n);
  }

  stopEvent() {
    this.n=0;
      this.stopGame.emit(this.n);

  }

  ngOnInit() {
  }

}
