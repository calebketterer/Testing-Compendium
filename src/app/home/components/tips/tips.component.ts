// Component managing the rotating tips ticker widget and dynamic font-fitting logic.
import { Component, ElementRef, ViewChild, Renderer2, AfterViewInit, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeStateService } from '../../services/home.state.service';
import { TipTransitionService } from './tip-transition.service';

@Component({
  selector: 'app-tips',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tips.component.html',
  styleUrl: './tips.component.css'
})
export class TipsComponent implements AfterViewInit {
  @ViewChild('Tips', { static: true }) Tips!: ElementRef<HTMLElement>;

  private renderer = inject(Renderer2);
  public state = inject(HomeStateService);
  private tipTransitionService = inject(TipTransitionService);

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.tipTransitionService.fitTipText(this.Tips, this.renderer);
    }, 0);
  }

  @HostListener('window:resize')
  onResize(): void {
    this.tipTransitionService.fitTipText(this.Tips, this.renderer);
  }

  cycleTipWithFade(): void {
    this.tipTransitionService.cycleTipWithFade(this.Tips, this.renderer);
  }
}