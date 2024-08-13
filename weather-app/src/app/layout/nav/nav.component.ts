import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from '../../components/weather/weather.component';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  providers: [],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent extends WeatherComponent {
  currentTime = new Date();
  searchTerm: string = '';

  constructor(weatherService: WeatherService, private router: Router) {
    super(weatherService);
  }

  onSearch() {
    const formattedCity = this.searchTerm
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-');

    this.router.navigate([`/weather/${formattedCity}`]);
    this.searchTerm = '';
  }
}
