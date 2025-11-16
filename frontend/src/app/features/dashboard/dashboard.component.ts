import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  city = 'Paris';
  lat = 48.8566;
  lon = 2.3522;

  weather: any = null;
  forecast: any[] = [];
  airQuality: any = null;
  searchResults: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getWeather();
  }

  // Recherche de villes
  searchCity() {
    this.http
      .get<any[]>(`http://localhost:3000/api/weather/geocode?q=${this.city}`)
      .subscribe((res) => this.searchResults = res);
  }

  // Lorsqu'une ville est cliquée
  selectCity(city: any) {
    this.lat = city.lat;
    this.lon = city.lon;
    this.city = city.name;
    this.getWeather();
  }

  // Charge météo + prévisions + air quality
  getWeather() {

    // Météo actuelle
    this.http
      .get<any>(`http://localhost:3000/api/weather/current?lat=${this.lat}&lon=${this.lon}`)
      .subscribe((res) => {
        this.weather = {
          city: res.name,
          temp: res.main.temp,
          feels_like: res.main.feels_like,
          humidity: res.main.humidity,
          wind: res.wind.speed,
          description: res.weather[0].description
        };
      });

    // Prévisions
    this.http
      .get<any>(`http://localhost:3000/api/weather/forecast?lat=${this.lat}&lon=${this.lon}`)
      .subscribe((res) => {
        this.forecast = res.list.slice(0, 4).map((item: any) => ({
          time: item.dt_txt.split(' ')[1],
          temp: item.main.temp
        }));
      });

    // Qualité de l'air
    this.http
      .get<any>(`http://localhost:3000/api/weather/air?lat=${this.lat}&lon=${this.lon}`)
      .subscribe((res) => {
        const a = res.list[0];
        this.airQuality = {
          aqi: a.main.aqi,
          pm25: a.components.pm2_5,
          pm10: a.components.pm10,
          ozone: a.components.o3
        };
      });
  }
}
