import { Component, OnInit, OnDestroy } from '@angular/core';
import { user } from './auth/login-form/login';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean;
  userDetails: user;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {}
}
