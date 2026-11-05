// Component managing the top global header navigation and home redirection logic.
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { HomeStateService } from '../../home/services/home.state.service';
import { PageTransitionService } from '../transitions/page-transition.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  public state = inject(HomeStateService);
  private router = inject(Router);
  private transitionService = inject(PageTransitionService);
  
  isAnimating = false;

  ngOnInit(): void {
    const initialPath = this.router.url.replace('/', '').toLowerCase();
    const currentView = initialPath || 'home';
    if (currentView !== this.state.selectedView) {
      this.state.updateView(currentView);
    }

    this.triggerFade();

    // Listen to subsequent route changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const path = event.urlAfterRedirects.replace('/', '').toLowerCase();
        const view = path || 'home';

        if (view !== this.state.selectedView) {
          this.state.updateView(view);
        }

        this.triggerFade();
      });
  }

  private triggerFade(): void {
    this.isAnimating = false;
    setTimeout(() => {
      this.isAnimating = true;
    }, 10);
  }

  goHome(): void {
    this.state.updateView('home');
    this.transitionService.navigateWithTransition('/', 250);
  }
}