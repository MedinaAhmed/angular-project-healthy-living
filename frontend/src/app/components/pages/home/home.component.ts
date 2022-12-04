import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  imageObject: Array<object> = [
    {
      image: '../../../../assets/salmon-min.jpg',
      thumbImage: '../../../../assets/salmon-keto.jpg',
      alt: 'alt of image',
    },
    {
      image: '../../../../assets/dessert-candy.jpg',
      thumbImage: '../../../../assets/dessert-brownie.jpg',
      alt: 'Image of healthy foods',
    },
    {
      image: '../../../../assets/dessert-candy.jpg',
      thumbImage: '../../../../assets/dessert-candy.jpg',
      alt: 'Image of healthy foods',
      title: 'DELICIOUS',
    },
    {
      image: '../../../../assets/salmon-keto.jpg',
      thumbImage: '../../../../assets/dessert-strawberry-min.jpg',
      alt: 'Image of healthy foods',
      title: 'FOOD',
    },
    {
      image: '../../../../assets/breakfast-in-jar.jpg',
      thumbImage: '../../../../assets/keto-salad-min.jpg',
      alt: 'Image of healthy foods',
    },
    {
      image: '../../../../assets/smothie-detox-min.jpg',
      thumbImage: '../../../../assets/breakfast-in-jar.jpg',
      alt: 'Image of healthy foods',
    },
    {
      image: '../../../../assets/smoothie-ananas.jpg',
      thumbImage: '../../../../assets/smoothie-ananas.jpg',
      alt: 'Image of healthy foods',
    },
    {
      image: '../../../../assets/smoothie-ananas.jpg',
      thumbImage: '../../../../assets/pizza.jpg',
      alt: 'Image of healthy foods',
    },
    {
      image: '../../../../assets/smoothie-ananas.jpg',
      thumbImage: '../../../../assets/dessert-muffin-min.jpg',
      alt: 'Image of healthy foods',
    },
  ];
  foods: Food[] = []; //hold the data that is get
  constructor(
    private foodService: FoodService,
    activatedRoute: ActivatedRoute
  ) {
    let foodsObservable: Observable<Food[]>;
    activatedRoute.params.subscribe((params) => {
      if (params['searchTerm']) {
        foodsObservable = this.foodService.getAllFoodsBySearchTerm(
          params.searchTerm
        );
      } else if (params.tag) {
        foodsObservable = this.foodService.getAllFoodsByTag(params.tag);
      } else {
        foodsObservable = foodService.getAll();
      }
      foodsObservable.subscribe((serverFoods) => {
        this.foods = serverFoods;
      });
    });
  }
  ngOnInit(): void {}
}
