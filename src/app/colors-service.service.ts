import { Injectable } from '@angular/core';
import { defer, map, merge, Subject, timer } from 'rxjs';
import { COLORS } from './sample-data';

@Injectable({
  providedIn: 'root',
})
export class ColorsServiceService {
  readonly $colors = defer(() =>
    merge(timer(1000), this.randomizeColorSet)
  ).pipe(map(() => this.createRandomSubset(COLORS, 5)));

  readonly randomizeColorSet = new Subject<void>();

  private createRandomSubset<T>(source: T[], size: number): T[] {
    return source.sort(() => Math.random() - 0.5).slice(0, size);
  }
}
