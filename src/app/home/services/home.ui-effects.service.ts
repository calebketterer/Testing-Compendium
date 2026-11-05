import { Injectable } from '@angular/core';
import { COLOR_POOL, GRADIENT_SENSITIVITY } from '../constants/home.constants';

@Injectable({
  providedIn: 'root'
})
export class UiEffectsService {

  getRandomizedColors(count: number): string[] {
    return [...COLOR_POOL].sort(() => Math.random() - 0.5).slice(0, count);
  }

  generateGradientString(x: number, colors: string[]): string {
    const shift = x * 0.5;
    const stops = colors.map((color, idx) => {
      const spread = 100 / (colors.length - 1);
      const pos = Math.max(0, Math.min(100, idx * spread + shift * GRADIENT_SENSITIVITY));
      return `${color} ${pos.toFixed(1)}%`;
    }).join(', ');

    return `linear-gradient(to right, ${stops})`;
  }
}