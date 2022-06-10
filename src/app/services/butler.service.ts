import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Butler {
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
    type:string="Passenger"; 
    placeholder:string="a donde deseas ir?"; 
	  any:any[]=[]; 
    number:number=0;

    constructor() { }
}