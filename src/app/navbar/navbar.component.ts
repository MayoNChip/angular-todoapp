import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { navbarItems } from './data/navbar.items';

// interface Todo {
//   userId: number;
//   id: number;
//   title: string;
//   completed: boolean;
// }

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  navbarItems = navbarItems;
  isLoggedIn: boolean;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getIsLoggedIn().subscribe((isLogged) => {
      console.log(isLogged);
      return (this.isLoggedIn = isLogged);
    });
  }

  logout() {
    localStorage.clear();
    this.isLoggedIn = false;
  }
}
