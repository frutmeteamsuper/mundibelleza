import { Component, OnInit } from '@angular/core';

import {Butler} from '@app/services/butler.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(
public _butler:Butler
    ) { }

  ngOnInit(): void {
  }

}
