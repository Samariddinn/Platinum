import { Component } from '@angular/core';
import { PartnersModel } from '../../models/partners.model';
import { partnersData } from '../../datas/partners.data';
import { LazyLoadImgDirective } from '../../directives/lazy-load-img.directive';

@Component({
  selector: 'app-partners',
  imports: [LazyLoadImgDirective],
  templateUrl: './partners.component.html',
  styleUrl: './partners.component.scss',
})
export class PartnersComponent {
  partnersData: PartnersModel[] = partnersData;
}
