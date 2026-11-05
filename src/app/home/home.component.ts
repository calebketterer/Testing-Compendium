import { Component, ElementRef, ViewChild, Renderer2, AfterViewInit, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeStateService } from './services/home.state.service';
import { PageTransitionService } from '../shared/transitions/page-transition.service';
import { TipTransitionService } from './components/tips/tip-transition.service';
import { HomeGreetingComponent } from './components/home-greeting/home-greeting.component';
import { HomeLinksComponent } from './components/home-links/home-links.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, HomeGreetingComponent, HomeLinksComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('Tips', { static: true }) Tips!: ElementRef<HTMLElement>;

  private renderer = inject(Renderer2);
  public state = inject(HomeStateService);
  private pageTransitionService = inject(PageTransitionService);
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

  onViewChange(event: Event): void {
    const val = (event.target as HTMLSelectElement).value;
    this.state.updateView(val);
    this.pageTransitionService.navigateWithTransition(val);
  }

  cycleTipWithFade() {
    this.tipTransitionService.cycleTipWithFade(this.Tips, this.renderer);
  }

  toggleDirection() {
    this.state.reverse = !this.state.reverse;
  }
}