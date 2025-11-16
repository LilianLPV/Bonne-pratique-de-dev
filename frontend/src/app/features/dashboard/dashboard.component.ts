import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Weather {
  city: string;
  temp: number;
  feels_like: number;
  humidity: number;
  wind: number;
  description: string;
}

interface ForecastItem {
  time: string;
  temp: number;
}

interface AirQuality {
  aqi: number;
  pm25: number;
  pm10: number;
  ozone: number;
}

interface CitySearch {
  name: string;
  lat: number;
  lon: number;
  country: string;
}

// ------ API RESPONSES ------
interface CurrentWeatherResponse {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  weather: { description: string }[];   // <--- FIXED
}

interface ForecastApiItem {
  dt_txt: string;
  main: { temp: number };
}

interface ForecastApiResponse {
  list: ForecastApiItem[];
}

interface AirApiResponse {
  list: {
    main: { aqi: number };
    components: {
      pm2_5: number;
      pm10: number;
      o3: number;
    };
  }[];                                  // <--- FIXED
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  view: 'dashboard' | 'forecast' = 'dashboard';

  city = 'Paris';
  lat = 48.8566;
  lon = 2.3522;

  weather: Weather | null = null;
  forecast: ForecastItem[] = [];
  airQuality: AirQuality | null = null;
  searchResults: CitySearch[] = [];

  private http = inject(HttpClient);

  ngOnInit(): void {
    this.getWeather();
  }

  setView(v: 'dashboard' | 'forecast') {
    this.view = v;
  }

  searchCity(): void {
    this.http
      .get<CitySearch[]>(`http://localhost:3000/api/weather/geocode?q=${this.city}`)
      .subscribe((res) => (this.searchResults = res));
  }

  selectCity(city: CitySearch): void {
    this.lat = city.lat;
    this.lon = city.lon;
    this.city = city.name;
    this.getWeather();
  }

  getWeather(): void {
    // Météo actuelle
    this.http
      .get<CurrentWeatherResponse>(
        `http://localhost:3000/api/weather/current?lat=${this.lat}&lon=${this.lon}`
      )
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
      .get<ForecastApiResponse>(
        `http://localhost:3000/api/weather/forecast?lat=${this.lat}&lon=${this.lon}`
      )
      .subscribe((res) => {
        this.forecast = res.list.slice(0, 4).map((item) => ({
          time: item.dt_txt.split(' ')[1],
          temp: item.main.temp
        }));
      });

    // Qualité de l'air
    this.http
      .get<AirApiResponse>(
        `http://localhost:3000/api/weather/air?lat=${this.lat}&lon=${this.lon}`
      )
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
