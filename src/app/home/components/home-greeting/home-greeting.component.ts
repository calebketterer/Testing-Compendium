// Component managing the greeting header, view selector dropdown, and rotating tips ticker.
import { Component, ElementRef, ViewChild, Renderer2, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeStateService } from '../../services/home.state.service';
import { PageTransitionService } from '../../../shared/transitions/page-transition.service';
import { TipTransitionService } from '../tips/tip-transition.service';

@Component({
  selector: 'app-home-greeting',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home-greeting.component.html',
  styleUrl: './home-greeting.component.css'
})
export class HomeGreetingComponent {
  @ViewChild('heyThere', { static: true }) heyThere!: ElementRef<HTMLElement>;
  @ViewChild('goodNews', { static: true }) goodNews!: ElementRef<HTMLElement>;
  @ViewChild('Tips', { static: true }) Tips!: ElementRef<HTMLElement>;

  private renderer = inject(Renderer2);
  public state = inject(HomeStateService);
  private pageTransitionService = inject(PageTransitionService);
  private tipTransitionService = inject(TipTransitionService);

  onViewChange(event: Event): void {
    const val = (event.target as HTMLSelectElement).value;
    this.state.updateView(val);
    const routePath = val === 'home' ? '/' : `/${val}`;
    this.pageTransitionService.navigateWithTransition(routePath);
  }

  shakeHeyThere() {
    this.applyShake(this.heyThere.nativeElement);
  }

  shakeGoodNews() {
    this.applyShake(this.goodNews.nativeElement);
  }

  cycleTipWithFade() {
    this.tipTransitionService.cycleTipWithFade(this.Tips, this.renderer);
  }

  private applyShake(element: HTMLElement) {
    this.renderer.removeClass(element, 'shake');
    void element.offsetWidth;
    this.renderer.addClass(element, 'shake');
  }
}