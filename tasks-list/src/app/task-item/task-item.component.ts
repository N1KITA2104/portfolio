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
  public isEditing: boolean = false;
  public editedTitle: string = '';
  public editedDescription: string = '';
  public editedExpiryDate: string = '';

  public toggleComplete() {
    this.task.completed = !this.task.completed;
    this.updateLocalStorage();
  }

  public editTask() {
    this.isEditing = true;
    this.editedTitle = this.task.title;
    this.editedDescription = this.task.description;
  
    if (this.task.expiryDate) {
      const localDate = new Date(this.task.expiryDate);
      localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());
      this.editedExpiryDate = localDate.toISOString().substring(0, 16);
    } else {
      this.editedExpiryDate = '';
    }
  }
  

  public saveTask() {
    if (this.editedTitle.trim()) {
      this.task.title = this.editedTitle;
      this.task.description = this.editedDescription;
      this.task.expiryDate = this.editedExpiryDate ? new Date(this.editedExpiryDate) : undefined;
      this.updateLocalStorage();
      this.isEditing = false;
    }
  }

  public cancelEdit() {
    this.isEditing = false;
  }

  public updateLocalStorage(): void {
    const tasksFromStorage = localStorage.getItem('tasks');
    if (tasksFromStorage) {
      const tasks: Task[] = JSON.parse(tasksFromStorage);
      const updatedTasks = tasks.map(t => t.id === this.task.id ? this.task : t);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
  }

  public getTimeRemaining(): string | null {
    if (!this.task.expiryDate) return null;
    
    const now = new Date();
    const expiryDate = new Date(this.task.expiryDate);
    const timeDifference = expiryDate.getTime() - now.getTime();
    
    if (timeDifference <= 0) return 'Expired';
    
    const minutes = Math.floor(timeDifference / 60000) % 60;
    const hours = Math.floor(timeDifference / (60000 * 60)) % 24;
    const days = Math.floor(timeDifference / (60000 * 60 * 24));
    
    return `${days > 0 ? days + 'd ' : ''}${hours > 0 ? hours + 'h ' : ''}${minutes > 0 ? minutes + 'm' : ''}`;
  }

  public onDelete() {
    this.delete.emit(this.task.id);
  }
}
