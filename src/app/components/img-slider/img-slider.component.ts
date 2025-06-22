import { Component, OnDestroy, OnInit, signal } from '@angular/core';

interface slideModel {
  image: string;
  text: string;
}

@Component({
  selector: 'app-img-slider',
  imports: [],
  templateUrl: './img-slider.component.html',
  styleUrl: './img-slider.component.scss',
})
export class ImgSliderComponent implements OnInit, OnDestroy {
  slides: slideModel[] = [
    {
      image: 'images/solution-1.webp',
      text: 'your professional solution',
    },

    {
      image: 'images/solution-2.webp',
      text: 'your professional solution',
    },
  ];
  currentIndex = signal(0);
  isReady = signal(false);
  private intervalId!: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady.set(true);
    }, 500);
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  startAutoSlide(): void {
    this.intervalId = setInterval(() => {
      this.currentIndex.set((this.currentIndex() + 1) % this.slides.length);
    }, 5000);
  }

  goToSlide(index: number): void {
    this.currentIndex.set(index);
    clearInterval(this.intervalId);
    this.startAutoSlide();
  }

  resetTextAnimation(): void {
    this.isReady.set(false); // Hide and reset the text
    setTimeout(() => {
      this.isReady.set(true);
    }, 100);
  }
}
