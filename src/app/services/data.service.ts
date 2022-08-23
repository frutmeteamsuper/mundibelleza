import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import { take,tap } from 'rxjs/operators';
import {Butler} from '@app/services/butler.service';

/*const GETNEWTRAVELS =  gql`
query GetTravelsByStatus($status: String!) {
  getTravelsByStatus(status: $status) {
    client
    origin
    destin
    distance
    amount
    createdAt
    status
    rateType
    currency 
  }
}`;*/
const GETCATEGORIES =  gql`
query GetCategories($status: String!,$skip:Int,$limit:Int) {
  getCategories(status: $status,skip:$skip,limit:$limit) {
    name
    idcategory
    subs{
        idcategory
        name
        idsub
    } 
  }
}`;
const GETPRODUCTS =  gql`
query GetProductsByStatus($status: String!,$skip:Int,$limit:Int) {
  getProductsByStatus(status: $status,skip:$skip,limit:$limit) {
    name
    description
    presentation
    category
    price
    ref
    status    
    currency
    images 
  }
}`;
const GETBESTSELLER =  gql`
query GetBestseller($status: String!,$skip:Int,$limit:Int) {
  getBestseller(status: $status,skip:$skip,limit:$limit) {
    name
    description
    presentation
    category
    price
    ref
    status    
    currency
    images 
  }
}`;
const GETDISCOUNT =  gql`
query GetDiscount($status: String!,$skip:Int,$limit:Int) {
  getDiscount(status: $status,skip:$skip,limit:$limit) {
    name
    description
    presentation
    category
    price
    ref
    status    
    currency
    images 
  }
}`;
const REGISTER =  gql`
    mutation register($input: UserInput){
        register(input:$input){
            id
            name
            username
            email
            createdAt
        }
    } 
`;

const LOGIN =  gql`
    mutation login($input: LoginInput){
        login(input:$input){
            token
        }
    } 
`;


@Injectable({
    providedIn: 'root'
  })

  export class DataService {
    private discountSubject= new BehaviorSubject<any[any]>(null);
    discount$ = this.discountSubject.asObservable();
    private bestsellerSubject= new BehaviorSubject<any[any]>(null);
    bestseller$ = this.bestsellerSubject.asObservable();
    private productsSubject= new BehaviorSubject<any[any]>(null);
    products$ = this.productsSubject.asObservable();
     private categoriesSubject= new BehaviorSubject<any[any]>(null);
    categories$ = this.categoriesSubject.asObservable();

    constructor(
        private apollo:Apollo,
        public _butler:Butler

    ) {
       this.getDataAPI(this._butler.skip,this._butler.limit);
       this.getDataAPIcategories(0,0);
       this.getBestseller(0,0);
       this.getDiscount(0,0);
    }
     getDataAPI(vskip:any,vlimit:any):void{
        this.apollo.watchQuery<any>({
            query: GETPRODUCTS,
            variables:{
                status:"activated",
                skip:vskip,
                limit:vlimit,
            }
        }).valueChanges.pipe(
            take(1),
            tap(({data})=>{
                const {getProductsByStatus} =data;
                this.productsSubject.next(getProductsByStatus);
                console.log(getProductsByStatus);
            })
            
        ).subscribe();
    }
     getBestseller(vskip:any,vlimit:any):void{
        this.apollo.watchQuery<any>({
            query: GETBESTSELLER,
            variables:{
                status:"bestseller",
                skip:vskip,
                limit:vlimit,
            }
        }).valueChanges.pipe(
            take(1),
            tap(({data})=>{
                const {getBestseller} =data;
                this.bestsellerSubject.next(getBestseller);
                console.log(getBestseller);
            })
            
        ).subscribe();
    }
     getDiscount(vskip:any,vlimit:any):void{
        this.apollo.watchQuery<any>({
            query: GETDISCOUNT,
            variables:{
                status:"discount",
                skip:vskip,
                limit:vlimit,
            }
        }).valueChanges.pipe(
            take(1),
            tap(({data})=>{
                const {getDiscount} =data;
                this.discountSubject.next(getDiscount);
                console.log(getDiscount);
            })
            
        ).subscribe();
    }
     getDataAPIcategories(vskip:any,vlimit:any):void{
        this.apollo.watchQuery<any>({
            query: GETCATEGORIES,
            variables:{
                status:"activated",
                skip:vskip,
                limit:vlimit,
            }
        }).valueChanges.pipe(
            take(1),
            tap(({data})=>{
                const {getCategories} =data;
                this.categoriesSubject.next(getCategories);
                console.log(getCategories);
            })
            
        ).subscribe();
    }
  }