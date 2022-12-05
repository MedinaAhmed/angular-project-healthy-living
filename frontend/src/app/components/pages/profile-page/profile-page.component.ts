import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent {
  user!: User;
  constructor(private userService: UserService, router: Router) {
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
      if (!this.user) router.navigateByUrl('/login');
      else router.navigateByUrl('/profile');
    });
  }
}
