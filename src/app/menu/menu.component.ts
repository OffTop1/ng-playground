import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from "../shared/dish";
import { DISHES } from "../shared/dishes";
import { DishService } from '../services/dish.service';

import {flyInOut, expand} from "../animations/app.animation";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  //tslint:disable-next-line:use-host-property-decorator
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [flyInOut(), expand()]
})
export class MenuComponent implements OnInit {
  errMess: string;
	dishes: Dish[];
  
	selectedDish: Dish = DISHES[0]


  constructor(private dishservice: DishService,
    @Inject('BaseURL') private baseURL) { }

  ngOnInit() {
    console.log(this.selectedDish)
    this.dishservice.getDishes()
    .subscribe(dishes => this.dishes = dishes,
      errmess => this.errMess = <any>errmess);
  }
  
  onSelect(dish: Dish) {
  	this.selectedDish = dish
  }

}
