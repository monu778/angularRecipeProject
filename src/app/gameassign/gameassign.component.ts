import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gameassign',
  templateUrl: './gameassign.component.html',
  styleUrls: ['./gameassign.component.css']
})
export class GameassignComponent implements OnInit {
  intr:Number;
  nuber:Number;
  constructor(){ }

  ngOnInit() { }
  start(nuber) {
  
    setInterval(function(this){
      console.log(this.nuber)
      nuber = nuber+1;
      this.nuber = nuber;
    },1000});
  }

  stop() { 
   
  }
}