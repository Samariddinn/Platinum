import {
  AfterViewInit,
  Directive,
  ElementRef,
  inject,
  Input,
  input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appLazyLoadImg]',
})
export class LazyLoadImgDirective implements AfterViewInit, OnDestroy {
  imgSrc = input<string>('');
  placeholder = input<string>('images/placeholder.webp');
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private observer!: IntersectionObserver;

  ngAfterViewInit(): void {
    const imgEl = this.el.nativeElement;

    // Step 1: Set placeholder immediately
    this.renderer.setAttribute(imgEl, 'src', this.placeholder());

    // Step 2: Setup lazy loading
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const realImg = new Image();
          realImg.src = this.imgSrc();

          realImg.onload = () => {
            this.renderer.setAttribute(imgEl, 'src', this.imgSrc());
          };

          realImg.onerror = () => {
            console.warn(`Image failed to load: ${this.imgSrc()}`);
          };

          this.observer?.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px',
      }
    );

    this.observer.observe(imgEl);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
