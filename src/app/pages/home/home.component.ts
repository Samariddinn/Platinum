import { Component } from '@angular/core';
import HeaderComponent from '../../components/header/header.component';
import { ImgSliderComponent } from '../../components/img-slider/img-slider.component';
import { OurCompanyComponent } from '../../components/our-company/our-company.component';
import { ProductServicesComponent } from '../../components/product-services/product-services.component';
import { PartnersComponent } from '../../components/partners/partners.component';
import { ManagementBoardComponent } from '../../components/management-board/management-board.component';
import { ContactUsComponent } from '../../components/contact-us/contact-us.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    ImgSliderComponent,
    OurCompanyComponent,
    ProductServicesComponent,
    PartnersComponent,
    ManagementBoardComponent,
    ContactUsComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export default class HomeComponent {}
