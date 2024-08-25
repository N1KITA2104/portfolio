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

  isEditing = false;
  editedTitle = '';
  editedDescription = '';
  editedExpiryDate = '';

  toggleComplete() {
    this.task.completed = !this.task.completed;
    this.updateLocalStorage();
  }

  onDelete() {
    this.delete.emit(this.task.id);
  }

  editTask() {
    this.isEditing = true;
    this.editedTitle = this.task.title;
    this.editedDescription = this.task.description;
    this.editedExpiryDate = this.task.expiryDate ? new Date(this.task.expiryDate).toISOString().slice(0, 16) : '';
  }

  saveTask() {
    if (this.editedTitle.trim()) {
      this.task.title = this.editedTitle;
      this.task.description = this.editedDescription;
      this.task.expiryDate = this.editedExpiryDate ? new Date(this.editedExpiryDate) : undefined;
      this.updateLocalStorage();
      this.isEditing = false;
    }
  }

  cancelEdit() {
    this.isEditing = false;
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
