import { Component, signal } from '@angular/core';
import { SelectListExampleComponent } from "./select-list-example/select-list-example.component";
import { ColorData } from './sample-data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, SelectListExampleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  readonly $myColors = signal<ColorData[]>([]);
}
