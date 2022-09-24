import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { TodosService } from '../service/todos.service';
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

  constructor(
    public authService: AuthService,
    public todoService: TodosService
  ) {}

  ngOnInit(): void {
    this.authService.getIsLoggedIn().subscribe((isLogged) => {
      console.log(isLogged);
      return (this.isLoggedIn = isLogged);
    });
  }

  logout() {
    this.todoService.resetTodos();

    this.authService.userLogout();
  }
}
