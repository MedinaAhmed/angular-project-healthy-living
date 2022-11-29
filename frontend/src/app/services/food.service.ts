import { Injectable } from '@angular/core';
import { sample_foods, sample_tags } from 'src/data';
import { Food } from '../shared/models/Food';
import { Tag } from '../shared/models/Tag';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor() {}
  getAll(): Food[] {
    //get all the date will conate to mongo
    return sample_foods;
  }
  //filter by search button
  getAllFoodsBySearchTerm(searchTerm: string) {
    return this.getAll().filter((food) =>
      food.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  getAllTags(): Tag[] {
    return sample_tags;
  }
  //filter by tag
  getAllFoodsByTag(tag: string): Food[] {
    return tag === 'All'
      ? this.getAll()
      : this.getAll().filter((food) => food.tags?.includes(tag)); //checking if it is included
  }
  // each food in separate page
  getFoodById(foodId: string): Food {
    return this.getAll().find((food) => food.id == foodId) ?? new Food();
  }
}
