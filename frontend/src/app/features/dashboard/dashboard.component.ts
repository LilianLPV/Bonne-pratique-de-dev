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

  constructor(private http: HttpClient) {}

  getWeather() {
    this.http
      .get(`http://localhost:3000/api/weather/current?lat=${this.lat}&lon=${this.lon}`)
      .subscribe((res) => (this.weather = res));
  }
}
