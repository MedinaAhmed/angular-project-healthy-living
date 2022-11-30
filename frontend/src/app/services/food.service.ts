import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { sample_foods, sample_tags } from 'src/data';
import {
  FOOD_BY_ID_URL,
  FOOD_BY_SEARCH_URL,
  FOOD_BY_TAG_URL,
  FOOD_TAGs_URL,
  FOOD_URL,
} from '../shared/constants/urls';
import { Food } from '../shared/models/Food';
import { Tag } from '../shared/models/Tag';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(private http: HttpClient) {}
  getAll(): Observable<Food[]> {
    //get all the date will conate to mongo
    return this.http.get<Food[]>(FOOD_URL);
  }
  //filter by search button
  getAllFoodsBySearchTerm(searchTerm: string) {
    return this.http.get<Food[]>(FOOD_BY_SEARCH_URL + searchTerm);
  }
  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(FOOD_TAGs_URL);
  }
  //filter by tag
  getAllFoodsByTag(tag: string): Observable<Food[]> {
    return tag === 'All'
      ? this.getAll()
      : this.http.get<Food[]>(FOOD_BY_TAG_URL + tag); //checking if it is included
  }
  // each food in separate page
  getFoodById(foodId: string): Observable<Food> {
    return this.http.get<Food>(FOOD_BY_ID_URL + foodId);
  }
}
