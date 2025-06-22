import { Component } from '@angular/core';
import { ProdServicesModel } from '../../models/product-services.model';
import { prodServicesData } from '../../datas/product-services.data';
import { LazyLoadImgDirective } from '../../directives/lazy-load-img.directive';

@Component({
  selector: 'app-product-services',
  imports: [LazyLoadImgDirective],
  templateUrl: './product-services.component.html',
  styleUrl: './product-services.component.scss',
})
export class ProductServicesComponent {
  productsData: ProdServicesModel[] = prodServicesData;
}
