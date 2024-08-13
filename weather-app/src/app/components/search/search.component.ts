import { Component } from '@angular/core';
import { CityWeatherComponent } from '../city-weather/city-weather.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CityWeatherComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  
}
