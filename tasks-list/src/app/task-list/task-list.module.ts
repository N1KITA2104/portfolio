import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './task-list.component';
import { TaskItemComponent } from '../task-item/task-item.component';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';



@NgModule({
  declarations: [
    TaskListComponent,
    TaskItemComponent,
    ProgressBarComponent
  ],
  imports: [
    CommonModule,
    FormsModule 
  ]
})
export class TaskListModule { }
