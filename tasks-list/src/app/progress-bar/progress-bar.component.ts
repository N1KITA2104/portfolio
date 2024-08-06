import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss'
})
export class ProgressBarComponent {
  @Input() completed: number = 0;
  @Input() total: number = 0;

  get percentage(): number {
    return this.total ? (this.completed / this.total) * 100 : 0;
  }
}
