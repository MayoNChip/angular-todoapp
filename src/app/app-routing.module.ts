import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoCardComponent } from './todo-card/todo-card.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {
    path: 'todos',
    component: TodoListComponent,
  },
  {
    path: 'tododetails/:todoId',
    component: TodoCardComponent,
  },
  {
    path: 'login',
    component: AuthComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [TodoCardComponent, TodoListComponent];
