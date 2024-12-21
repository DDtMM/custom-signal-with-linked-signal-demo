import { CommonModule } from '@angular/common';
import { Component, effect, inject, model } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ColorsServiceService } from '../colors-service.service';
import { selectListSignal } from '../select-list-signal';

@Component({
  selector: 'app-select-list-example',
  imports: [CommonModule, FormsModule],
  templateUrl: './select-list-example.component.html',
  styleUrl: './select-list-example.component.scss'
})
export class SelectListExampleComponent {
  private readonly colorService = inject(ColorsServiceService);
  readonly $colors = toSignal(this.colorService.$colors, { initialValue: [] });
  readonly $colorOptions = selectListSignal(this.$colors);
  readonly selections = model(this.$colorOptions.$selections());
  readonly randomizeColorSet = this.colorService.randomizeColorSet.next.bind(this.colorService.randomizeColorSet);
  
  constructor() {
    effect(() => this.selections.set(this.$colorOptions.$selections()));
  }
}
