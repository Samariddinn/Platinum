import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
  viewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { LazyLoadImgDirective } from '../../directives/lazy-load-img.directive';
import { RouterLink } from '@angular/router';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export default class HeaderComponent implements OnInit, OnDestroy {
  public scrollService = inject(ScrollService);
  @ViewChild('menu') menuRef!: ElementRef;

  isOpen = signal(false);
  isScrolled = signal(false);
  menuHeight = 0;

  private resizeObserver: ResizeObserver | null = null;

  ngOnInit(): void {
    if (this.menuRef && this.menuRef.nativeElement) {
      this.resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          if (entry.target === this.menuRef.nativeElement) {
            if (this.isOpen()) {
            }
          }
        }
      });
      this.resizeObserver.observe(this.menuRef.nativeElement);
    }
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  toggleMenu(): void {
    const willOpen = !this.isOpen();
    this.isOpen.set(willOpen);

    if (this.menuRef && this.menuRef.nativeElement) {
      this.menuRef.nativeElement.style.transition =
        'max-height 0.3s ease-in-out';

      if (willOpen) {
        // SET ACTUAL MAX HEIGHT
        const scrollHeight = this.menuRef.nativeElement.scrollHeight;
        this.menuRef.nativeElement.style.maxHeight = scrollHeight + 'px';
        this.menuHeight = scrollHeight;
      } else {
        this.menuRef.nativeElement.style.maxHeight = '0px';
        this.menuHeight = 0;
      }
    }
  }

  // For changing bg
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 50);
  }

  // Scroll to specific sections
  public handleNavigationClick(sectionId: string): void {
    this.scrollService.scrollToSection(sectionId);

    if (this.isOpen()) {
      this.toggleMenu();
    }
  }
}
