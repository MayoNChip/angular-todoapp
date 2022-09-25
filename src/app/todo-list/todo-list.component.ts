import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { TodosService } from '../service/todos.service';
import { Todo } from './todos';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { Observable } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { user } from '../auth/login-form/login';
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
  userId: number;
  limitBy: number = 40;
  userDetails: user;

  // Toggle State
  onlyCompletedChecked: boolean = false;

  constructor(
    public todosService: TodosService,
    public authService: AuthService,
    public router: Router,
    public modal: MatDialog,
    private cd: ChangeDetectorRef,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      `addTodoIconSvg`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        `../../assets/icons8-plus.svg`
      )
    );
  }

  ngOnInit(): void {
    this.authService.getIsLoggedIn().subscribe((res) => {
      this.isLoggedIn = res;
      if (res) {
        const userId = localStorage.getItem('userId');
        this.userId = parseInt(userId!);
        this.userDetails = this.authService.getUserDetails();

        this.getUserTodos();
      } else {
        this.todos = [];
        // this.router.navigate(['/home']);
      }
    });
  }

  getUserTodos() {
    this.todosService.getTodosByUserId(this.userId).subscribe((res) => {
      console.log(res);
      this.todos = res;
      this.cd.detectChanges();
    });
  }

  handleAddTodo() {
    this.modal.open(ModalComponent, {
      width: '860px',
      panelClass: 'custom-dialog-container',
    });
  }

  openTodoDialog(todo?: Todo) {
    if (todo) {
      console.log(todo);
      this.modal.open(ModalComponent, {
        data: {
          ...todo,
          new: todo.new ? todo.new : false,
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

  toggleOnlyCompleted() {
    console.log(this.onlyCompletedChecked);

    this.todosService.toggleCompleted(this.onlyCompletedChecked);
  }

  encapsulation: ViewEncapsulation.None;
}
