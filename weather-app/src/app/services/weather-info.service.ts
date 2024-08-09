import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherInfoService {
  private apiKey = environment.weatherApiKey;
  private apiUrl = environment.weatherApiUrl;

  constructor(private http: HttpClient) { }

  getWeatherByCoordinates(lat: number, lon: number): Observable<any> {
    const url = `${this.apiUrl}/current.json?key=${this.apiKey}&q=${lat},${lon}`;
    return this.http.get(url);
  }
}
