import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../layout/loading/loading.component';
import { WeatherComponent } from '../weather/weather.component';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-hourly',
  standalone: true,
  imports: [CommonModule, LoadingComponent],
  templateUrl: './hourly.component.html',
  styleUrl: './hourly.component.scss'
})
export class HourlyComponent extends WeatherComponent {
  override forecast: boolean = true;

  constructor(weatherService: WeatherService) {
    super(weatherService);
  }

  trackByHour(index: number, hour: any): string {
    return hour.time;
  }
}
