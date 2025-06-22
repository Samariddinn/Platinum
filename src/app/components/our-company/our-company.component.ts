import { Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-our-company',
  imports: [],
  templateUrl: './our-company.component.html',
  styleUrl: './our-company.component.scss',
})
export class OurCompanyComponent implements OnInit {
  isReady = signal(false);

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady.set(true);
    }, 1000);
  }
}
