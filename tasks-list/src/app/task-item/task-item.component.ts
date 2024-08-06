import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../task.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss'
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() delete = new EventEmitter<number>();

  toggleComplete() {
    this.task.completed = !this.task.completed;
    this.updateLocalStorage();
  }

  onDelete() {
    this.delete.emit(this.task.id);
  }

  updateLocalStorage(): void {
    const tasksFromStorage = localStorage.getItem('tasks');
    if (tasksFromStorage) {
      const tasks: Task[] = JSON.parse(tasksFromStorage);
      const updatedTasks = tasks.map(t => t.id === this.task.id ? this.task : t);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
  }
}
