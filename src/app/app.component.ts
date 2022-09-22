import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    const isLogged = this.authService
      .getIsLoggedIn()
      .subscribe((res) => (this.isLoggedIn = res));
  }
}
