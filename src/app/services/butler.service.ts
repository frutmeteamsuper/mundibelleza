import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Butler {
    car:any[]=[];
    currency:number=1;
    numProd:number=0;
    preview:any={};
    totalProducts:number=0;
    imagePreviewProduct:string="";
      subTotal:number=0;

    vector:any={};       
    string:string=""; 
    distance:string="";
    distance2:number=0;
    duration:number=0;
    biker:boolean=false;
    details:boolean=false;
    profile:boolean=true;
    rides:boolean=false;
    bikerStatus:boolean=true;
    skip:number=1;
    limit:number=9;
    type:string="Passenger"; 
    placeholder:string="a donde deseas ir?"; 
	  any:any[]=[]; 
    number:number=0;

    constructor() { }
}