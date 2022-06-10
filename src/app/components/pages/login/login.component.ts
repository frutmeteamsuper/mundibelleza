import { Component, OnInit } from '@angular/core';
import { Butler } from '@app/services/butler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public _butler:Butler
  ) { }


  ngOnInit(): void {
  this._butler.biker=false;
  }

}
