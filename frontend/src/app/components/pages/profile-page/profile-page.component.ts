import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { UserService } from 'src/app/services/user.service';
import { IFoodProduct } from 'src/app/shared/interfaces/IFoodProduct';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  user!: User;
  addProductForm!: FormGroup;
  isSubmitted = false;
  returnUrl = '';
  router: any;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private foodService: FoodService,
    private userService: UserService,
    router: Router
  ) {
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
      if (!this.user) router.navigateByUrl('/login');
      else router.navigateByUrl('/profile');
    });
  }
  ngOnInit(): void {
    this.addProductForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      price: ['', [Validators.required, Validators.minLength(1)]],
      tags: ['', Validators.required],
      favorite: ['', Validators.required],
      stars: ['', Validators.required],
      imageUrl: ['', Validators.required],
      origins: ['', Validators.required],
      cookTime: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(3)],
      ],
    });
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }
  get fc() {
    return this.addProductForm.controls;
  }
  submit() {
    this.isSubmitted = true;
    if (this.addProductForm.invalid)
      return console.log('INVALID ADDPROFUCTFORM');

    const fv = this.addProductForm.value;
    const product: IFoodProduct = {
      name: fv.name,
      price: fv.price,
      tags: fv.tags,
      favorite: fv.favorite,
      stars: fv.stars,
      imageUrl: fv.imageUrl,
      origins: fv.origins,
      cookTime: fv.cookTime,
    };

    this.foodService.addProduct(product).subscribe((_) => {
      this.router.navigateByUrl('/home-page');
    });
  }
}
