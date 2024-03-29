import { Component, OnInit, Inject } from '@angular/core';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';

import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { baseURL } from '../shared/baseurl';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

   dish!: Dish;
   dishErrMess:string;
  promotion!: Promotion;
  leader!:Leader;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService, private leaderservice: LeaderService,
	@Inject('baseURL')public baseURL) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish().subscribe(dish =>this.dish =dish,
	errmess => this.dishErrMess = <any>errmess);
    this.promotionservice.getFeaturedPromotion().subscribe( promotion => this.promotion = promotion);
	this.leaderservice.getFeaturedLeader().subscribe(leader => this.leader = leader);
  }

}
