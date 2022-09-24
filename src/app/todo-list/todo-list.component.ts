import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { TodosService } from '../service/todos.service';
import { Todo } from './todos';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { Observable } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent implements OnInit {
  todos: Todo[];
  todosListener: Observable<any>;
  isLoggedIn: boolean;
  isModalOpen: boolean;
  userId: string;
  limitBy: number = 40;

  constructor(
    public todosService: TodosService,
    public authService: AuthService,
    public router: Router,
    public modal: MatDialog,
    private cd: ChangeDetectorRef
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
        this.userId = userId!;
        this.getUserTodos(parseInt(userId!));
      } else {
        this.todos = [];
      }
    });
  }

  // handleTodoClick = (todoId: number) => {
  //   console.log(todoId);
  //   // this.router.navigate(['tododetails', todoId]);
  //   this.isModalOpen = true;
  // };

  handleAddTodo() {
    this.modal.open(ModalComponent, {
      width: '860px',
      panelClass: 'custom-dialog-container',
    });
  }

  getUserTodos(userId: number) {
    this.todosService.getTodosByUserId(userId).subscribe((res) => {
      let todosWithIndex: Todo[] = [];
      const newTodos = res.map((todo, i) => {
        if (typeof todo.userId === 'string') {
          parseInt(todo.userId);
        }
        const todoWithIndex = { ...todo, i };
        return todoWithIndex;
      });
      console.log('new todos after adding index', newTodos);
      const sortedTodos = newTodos.sort((a, b) =>
        a.i == b.i ? 0 : a.i > b.i ? 1 : -1
      );
      this.todos = sortedTodos;
      this.cd.detectChanges();
    });
  }

  openTodoDialog(todo?: Todo) {
    if (todo) {
      console.log(todo);
      this.modal.open(ModalComponent, {
        data: {
          ...todo,
          isNew: false,
          userId: this.userId,
        },
        width: '860px',
        panelClass: 'custom-dialog-container',
      });
    } else {
      this.modal.open(ModalComponent, {
        data: {
          userId: this.userId!,
          userTodosLength: this.todos.length,
        },
        width: '860px',
        panelClass: 'custom-dialog-container',
      });
    }
  }
}
