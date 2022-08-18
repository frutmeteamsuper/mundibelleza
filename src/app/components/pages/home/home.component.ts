import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ScriptService } from '@app/services/script.service';
import { ScriptStore } from '@app/services/script.store';
import { SwiperOptions } from 'swiper';
import {Butler} from '@app/services/butler.service';
import { BikersService } from '@app/services/';
import {Map, Popup,Marker} from 'mapbox-gl';
import { MapService } from '@app/services/map.service';
import { Feature } from '@app/interfaces/places';
import { Apollo } from "apollo-angular";
import { DataService } from '@app/services/data.service'; 
import gql from "graphql-tag";
const getProductsQuery = gql`
query GetProductsByStatus($status: String!) {
  getProductsByStatus(status: $status) {
    name
    description
    presentation
    ref
    price
    status
    currency 
  }
}`;
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
   // selector: string = ".main-content";
  bestseller: any;
  bestseller$: any;
   products: any;
  products$: any;
  private debounceTimer?:NodeJS.Timeout;
@ViewChild('mapDiv')mapDivElement!:ElementRef
@ViewChild('mysearch')myserachElement!:ElementRef

link:string=""; 
  constructor(
    private bikersService:BikersService,
    public script:ScriptService,
    private mapService:MapService,
    public router:Router,
    private apollo: Apollo,
    public dataApi: DataService,
    public _butler: Butler
  ) { } 

  config: SwiperOptions = {

    a11y: { enabled: true },
    direction: 'horizontal',
    slidesPerView: 5,
    keyboard: true,
    mousewheel: false,
    scrollbar: false,
    pagination: false,
    spaceBetween: 5,
    navigation: false
  };  
  

 public quick(tix:any){
    let tixToView = tix;
    this._butler.preview=tixToView;
    // this._butler.preview.quantity=1; 
    this._butler.imagePreviewProduct=this._butler.preview.images[0];
      // this.router.navigate(['/product']);
  } 
 public viewProduct(tix:any){
    let tixToView = tix;
    this._butler.preview=tixToView;
    // this._butler.preview.quantity=1; 
    this._butler.imagePreviewProduct=this._butler.preview.images[0];
      this.router.navigate(['/product']);
  } 

public details(b:any){
  let a =b;
  // if (a==1){this.link="assets/assets/img/user4.jpg";}
  // if (a==2){this.link="assets/assets/img/user10.jpg";}
  // if (a==3){this.link="assets/assets/img/user40.jpg";}
  // if (a==4){this.link="assets/assets/img/user2.jpg";}
  // if (a==5){this.link="assets/assets/img/user20.jpg";}
  // if (a==6){this.link="assets/assets/img/user3.jpg";}
if(!this._butler.details){
    this._butler.details=true;
    return
  }else{
    this._butler.details=false;
  }
}
get isLoadingPlaces(){
  return this.bikersService.isLoadingPlaces;
}
get isUserLocationReady():boolean{
  return this.bikersService.isUserLocationReady;
}
get places() :Feature []{
  return this.bikersService.places; 
}
flyTo(place:Feature ){
  const   [lng,lat]=place.center; 
  // this.document.getElementById("sear").blur();
  this.mapService.flyTo([lng,lat ]);
  this.focusRemove();
  this.getDirections(place);
}
onQueryChanged(query:string=''){
  if (this.debounceTimer)clearTimeout (this.debounceTimer);
  this.debounceTimer=setTimeout (()=> {
   this.bikersService.getPlacesByQuery(query);
    // console.log(query);
  }, 350);
}
focusRemove(){
  this.myserachElement.nativeElement.blur();
}
getDirections(place:Feature){
  if (!this.bikersService.userLocation) throw Error('ubicacion no disponible');  
  const start =this.bikersService.userLocation!;
  const end =place.center as [number,number]  ;
  this.mapService.getRouteBetweenPoints(start,end);

}

  onScroll() {
    console.log("scrolled!!");
  }
  ngAfterViewInit(): void {
    this.bestseller$=this.dataApi.bestseller$;
    // console.log(this.bikersService.userLocation);
    //  this.script.load(
    // // 'jquery',
    // 'modernizr',
    // 'jquery',
    // 'jquery-migrate',
    // 'bootstrap.bundle',
    // 'swiper-bundle',
    // 'fancybox',
    // 'jquery.nice-select',
    // 'main')
    // .then(data => {
    //   console.log('script loaded ', data);
    // }).catch(error => console.log(error));
   
    // const map = new Map({
    //   container: this.mapDivElement.nativeElement, // container ID
    //   style: 'mapbox://styles/mapbox/streets-v11', // style URL
    //   center:this.bikersService.userLocation,
    //   pitch: 60, // pitch in degrees
    //   bearing: 40, // bearing in degrees
    //   zoom: 15 // starting zoom
    //   });
    // const popup = new Popup()
    //   .setHTML(`
    //   <h6>Aqui estoy</h6>
    //   </span>esta es mi ubicación</span>
    //     `); 
    // new Marker({color:'red'}).setLngLat(this.bikersService.userLocation!)
    //   .setPopup(popup)
    //   .addTo(map)
    // this.mapService.setMap(map)

  }
}
