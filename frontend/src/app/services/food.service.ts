import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { sample_foods, sample_tags } from 'src/data';
import {
  ADD_NEW_PRODUCT,
  FOOD_BY_ID_URL,
  FOOD_BY_SEARCH_URL,
  FOOD_BY_TAG_URL,
  FOOD_TAGs_URL,
  FOOD_URL,
  PROFILE_URL,
} from '../shared/constants/urls';
import { IFoodProduct } from '../shared/interfaces/IFoodProduct';
import { Food } from '../shared/models/Food';
import { Tag } from '../shared/models/Tag';
const FOOD_KEY = 'Food';
@Injectable({
  providedIn: 'root',
})
export class FoodService {
  private foodSubject = new BehaviorSubject<Food>(
    this.getFoodFromLocalStorage()
  );
  constructor(private http: HttpClient, private toastrService: ToastrService) {}
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
  private setFoodToLocalStorage(food: Food) {
    localStorage.setItem(FOOD_KEY, JSON.stringify(food));
  }
  private getFoodFromLocalStorage(): Food {
    const foodJson = localStorage.getItem(FOOD_KEY);
    if (foodJson) return JSON.parse(foodJson) as Food;
    return new Food();
  }
  addProduct(foodProduct: IFoodProduct): Observable<Food> {
    return this.http.post<Food>(ADD_NEW_PRODUCT, foodProduct).pipe(
      tap({
        //happy part we have food
        next: (food: Food) => {
          this.setFoodToLocalStorage(food);
          //notifing all observable
          this.foodSubject.next(food);
          this.toastrService.success(
            `You add a new food`,
            `Product is add Succefully`
          );
        },
        error: (errorResponse) => {
          this.toastrService.error(
            errorResponse.error,
            'Creating product Failed, Try again!'
          );
        },
      })
    );
  }
}
