import { isPlatformBrowser, ViewportScroller } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  Subscription,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  public isScrolled = signal(false);

  private scroller = inject(ViewportScroller);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private scrollSubscription: Subscription | null = null;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.initScrollListener();
    }
  }

  private initScrollListener(): void {
    this.scrollSubscription = fromEvent(window, 'scroll')
      .pipe(
        debounceTime(50),
        map(() => window.scrollY > 50),
        distinctUntilChanged()
      )
      .subscribe((scrolled) => {
        this.isScrolled.set(scrolled);
      });
  }

  public scrollToSection(sectionId: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      console.warn('Scrolling is a browser-only operation.');
      return;
    }

    const currentUrl = this.router.url.split('#')[0];

    this.router
      .navigate([currentUrl], { fragment: sectionId, replaceUrl: true })
      .then(() => {
        setTimeout(() => {
          this.scroller.scrollToAnchor(sectionId);
        }, 100);
      })
      .catch((err) => {
        console.error('Error navigating to fragment:', err);
        this.scroller.scrollToAnchor(sectionId);
      });
  }

  ngOnDestroy(): void {
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
  }
}
