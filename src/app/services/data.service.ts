import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import { take,tap } from 'rxjs/operators';
import {Butler} from '@app/services/butler.service';

const GETNEWTRAVELS =  gql`
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
    private productsSubject= new BehaviorSubject<any[any]>(null);
    products$ = this.productsSubject.asObservable();

    constructor(
        private apollo:Apollo,
        public _butler:Butler

    ) {
       this.getDataAPI(this._butler.skip,this._butler.limit);
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
  }