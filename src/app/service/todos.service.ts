import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { Todo } from '../todo-list/todos';

@Injectable({
  providedIn: 'root',
})
export class TodosService implements OnInit {
  constructor(public http: HttpClient) {}

  private userTodosTest: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>(
    []
  );
  public userTodosTest$: Observable<Todo[]> = this.userTodosTest.asObservable();
  userTodos: Todo[];

  public updatedUserTodos: BehaviorSubject<Todo[]> = new BehaviorSubject<
    Todo[]
  >([]);
  public updatedUserTodos$: Observable<Todo[]> =
    this.updatedUserTodos.asObservable();
  userTodosWithUpdates: Todo[];
  isMutated: boolean = false;

  ngOnInit() {}

  // getLastTodoId():Todo[] {
  //   return this.user
  // }

  getTodosByUserId(userId: number): Observable<Todo[]> {
    if (this.isMutated) {
      return this.updatedUserTodos$;
    }
    // this.updatedUserTodos.subscribe((res) => {
    //   if (res.length > 0) {
    //     return (this.userTodosWithUpdates = res);
    //   }
    //   return;
    // });

    // if (!this.userTodosWithUpdates) {
    //   console.log('updated array');
    //   return this.updatedUserTodos$;
    // }

    this.http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos', {
        params: {
          userId,
        },
      })
      .subscribe((res) => (this.userTodos = res));
    this.userTodosTest.next(this.userTodos);

    return this.userTodosTest$;
  }

  getTodoById(todoId: number) {
    if (this.userTodos) {
      console.log('userTodos from get todo details', this.userTodos);
      const filteredTodo = this.userTodos.filter((todo) => {
        return todoId === todo.id;
      });
      if (filteredTodo.length !== 1) {
        console.log('no todo on this id');
        return;
      }
      const finalTodo = filteredTodo[0];
      return finalTodo;
    }
    return;
  }

  updateStatusById(todoId: number, status: boolean, userId: number) {
    const TodoToUpdate = this.userTodos.map((todo: Todo) => {
      return todo.id === todoId;
    });
    const indexOfTodo = this.userTodos.findIndex((todo) => todo.id === todoId);
    this.userTodos[indexOfTodo].completed = status;
    if (this.isMutated) {
      this.updatedUserTodos.next(this.userTodos);
    }
    this.userTodosTest.next(this.userTodos);
  }

  addNewTodo(newTodo: Todo) {
    if (typeof newTodo.userId === 'string') {
      newTodo.userId = parseInt(newTodo.userId);
    }
    // this.userTodos.push(newTodo);
    this.userTodos.splice(0, 0, newTodo);
    // const newTodos = [...this.userTodos, newTodo];
    console.log('todos before add', this.userTodos);
    // this.userTodos = newTodos;
    this.updatedUserTodos.next(this.userTodos);
    this.userTodosTest.next(this.userTodos);
    this.isMutated = true;
  }

  resetTodos() {
    this.updatedUserTodos.unsubscribe();
    this.userTodosTest.unsubscribe();
    this.isMutated = false;
  }
}
