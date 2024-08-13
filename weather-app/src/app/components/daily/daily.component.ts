import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../layout/loading/loading.component';
import { WeatherComponent } from '../weather/weather.component';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-daily',
  standalone: true,
  imports: [CommonModule, LoadingComponent],
  templateUrl: './daily.component.html',
  styleUrl: './daily.component.scss'
})
export class DailyComponent extends WeatherComponent {
  override forecast: boolean = true;

  constructor(weatherService: WeatherService) {
    super(weatherService);
  }
}
