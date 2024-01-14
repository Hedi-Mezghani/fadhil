import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dialogue-cra',
  templateUrl: './dialogue-cra.component.html',
  styleUrls: ['./dialogue-cra.component.css']
})
export class DialogueCraComponent {

  constructor() { }
  toppings = new FormControl();

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];


}

