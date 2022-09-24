import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TodosService } from '../service/todos.service';

import { Todo } from '../todo-list/todos';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Todo,
    public todoService: TodosService, public dialog : MatDialog
  ) {}

  //

  ngOnInit(): void {
    console.log(this.data);
  }

  toggleTodoStatus(todoData: Todo) {
    this.data.completed = !todoData.completed;
    if(this.data.new) {
      this.data.new = false
    } 
    console.log('to do data new todo', todoData);
    this.todoService.updateStatusById(
      todoData.id,
      todoData.completed,
      todoData.userId
    );
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  encapsulation: ViewEncapsulation.None;
}
