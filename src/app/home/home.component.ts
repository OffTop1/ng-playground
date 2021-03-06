import { Component, OnInit } from '@angular/core';
import {PromotionService} from "../services/promotion.service";
import {DishService} from "../services/dish.service";
import {LeaderService} from "../services/leader.service";
import {Dish} from "../shared/dish";
import {Promotion} from "../shared/promotion";
import {Leader} from "../shared/leader";

import {flyInOut, expand} from "../animations/app.animation";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [expand()]
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;


  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderservice: LeaderService) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish()
    .subscribe(dish => this.dish = dish)
    this.promotionservice.getFeaturedPromotion()
    .subscribe(promotion => this.promotion = promotion)
    this.leaderservice.getFeaturedLeader()
    .subscribe(leader => this.leader = leader)
  }

}
