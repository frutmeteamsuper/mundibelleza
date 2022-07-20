import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { InfiniteScrollModule } from "ngx-infinite-scroll";


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgxUsefulSwiperModule,
    InfiniteScrollModule
  ]
})
export class HomeModule { }
