import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth/auth.service';
import { User } from '../models/user.model';
import { faGripfire } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  fire = faGripfire;

  logUser: User = {
    "_id": "-1",
    "email": "empty@email.com",
    "password": "empty passw",
    "username": "myUsername",
    "created_at": new Date,
    "updated_at": new Date,
  };

  purcentage: number = 0;

  constructor(private authService: AuthService) { 
    let logUser = this.authService.getUser();

    if ( logUser == null ) {
      this.authService.logout();
    } else {
      this.logUser = logUser;
    }

  }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
  }

  purcentageUpdate( purcentage: number ) {
    this.purcentage = purcentage;
  }

}
