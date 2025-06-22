import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IconService } from './services/icon.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'platinum';
  iconsService = inject(IconService);

  ngOnInit(): void {
    this.iconsService.registerIcons();
  }
}
