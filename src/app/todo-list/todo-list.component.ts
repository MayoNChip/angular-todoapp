import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from '../auth/login-form/login';
import { AuthService } from '../service/auth.service';
import { TodosService } from '../service/todos.service';
import { Todo } from './todos';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[];
  isLoggedIn: boolean;
  isModalOpen: boolean;
  userId: string;

  constructor(
    public todosService: TodosService,
    public authService: AuthService,
    public router: Router,
    public modal: MatDialog
  ) {
    // const userId = localStorage.getItem('userId');
    // if (!userId) {
    //   console.log('user not logged in');
    //   return;
    // }
    // this.userId = userId;
    // console.log('user logged in, user id =>', userId);
  }

  ngOnInit(): void {
    console.log(this.todos);
    this.authService.getIsLoggedIn().subscribe((res) => {
      this.isLoggedIn = res;
      if (res) {
        const userId = localStorage.getItem('userId');
        this.getUserTodos(parseInt(userId!));
      } else {
        this.todos = []
      }
    });
  }

  handleTodoClick = (todoId: number) => {
    console.log(todoId);
    // this.router.navigate(['tododetails', todoId]);
    this.isModalOpen = true;
  };

  handleAddTodo() {
    this.modal.open(ModalComponent, {
      width: '860px',
      panelClass: 'custom-dialog-container',
    });
  }

  getUserTodos(userId: number) {
    this.todosService.getTodosByUserId(userId).subscribe((res) => {
      this.todos = res;
    });
  }

  openModal(todo: Todo) {
    this.modal.open(ModalComponent, {
      data: {
        ...todo,
      },
      width: '860px',
      panelClass: 'custom-dialog-container',
    });
  }
}
