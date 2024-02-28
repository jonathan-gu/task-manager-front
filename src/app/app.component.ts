import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HomeComponent } from './views/home/home.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [
    HttpClientModule,
    MatToolbarModule,
    HomeComponent
  ]
})

export class AppComponent {
}
