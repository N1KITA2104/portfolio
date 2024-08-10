import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService {
  private apiKey = environment.weatherApiKey;
  private apiUrl = environment.weatherApiUrl;

  constructor(private http: HttpClient) { }

  getWeatherByCoordinates(lat: number, lon: number): Observable<any> {
    const url = `${this.apiUrl}/forecast.json?key=${this.apiKey}&q=${lat},${lon}&days=10`;
    return this.http.get(url);
  }

  getWeatherByCity(city: string): Observable<any> {
    const url = `${this.apiUrl}/forecast.json?key=${this.apiKey}&q=${city}&days=10`;
    return this.http.get(url);
  }

}
