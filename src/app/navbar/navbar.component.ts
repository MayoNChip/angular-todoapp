import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { TodosService } from '../service/todos.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  navbarItems = [
    {
      id: 1,
      title: 'Home',
      path: '/home',
    },
    {
      id: 2,
      title: "My Todo's",
      path: '/todos',
    },
  ];

  isLoggedIn: boolean;
  public innerWidth: number;

  constructor(
    public authService: AuthService,
    public todoService: TodosService
  ) {}

  ngOnInit(): void {
    this.authService.getIsLoggedIn().subscribe((isLogged) => {
      console.log(isLogged);
      return (this.isLoggedIn = isLogged);
    });
    this.innerWidth = window.innerWidth;
  }

  checkWindowSize() {
    console.log('window size', this.innerWidth);
  }

  logout() {
    this.todoService.resetTodos();

    this.authService.userLogout();
  }

  encapsulation: ViewEncapsulation.None;
}
