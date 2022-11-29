import { Injectable } from '@angular/core';
import { sample_foods } from 'src/data';
import { Food } from '../shared/models/Food';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor() {}
  getAll(): Food[] {
    //get all the date will conate to mongo
    return sample_foods;
  }
  getAllFoodsBySearchTerm(searchTerm: string) {
    return this.getAll().filter((food) =>
      food.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
