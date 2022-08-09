import { Component, OnInit } from '@angular/core';
import {Butler} from '@app/services/butler.service';

import { Apollo } from "apollo-angular";
import { DataService } from '@app/services/data.service'; 
import gql from "graphql-tag";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  products: any;
  products$: any;  
  categories: any;
  categories$: any;
  constructor(
   private apollo: Apollo,
    public dataApi: DataService,
    public _butler: Butler
    ) { }

  loadProducts(){
    this._butler.skip=0;
    this._butler.limit=9;
     
  }

  ngOnInit(): void {
     this.products$=this.dataApi.products$;   
     this.categories$=this.dataApi.categories$;   
   // this.loadProducts();

  }
  loadmore(indice:any){
    // this.products$=[];
    console.log(indice);
     this._butler.skip=this._butler.skip+9; 
      this.dataApi.getDataAPI(this._butler.skip,this._butler.limit);   
     this.products$=this.dataApi.products$;  
     // this._butler.limit=this._butler.limit+9; 


  }

}
