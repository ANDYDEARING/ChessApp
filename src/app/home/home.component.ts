import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Router } from '@angular/router';
import { GameStub } from '../models/GameStub';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username:string;
  stubs:GameStub[];
  constructor(private homeService: HomeService, private router: Router) { }

  ngOnInit() {
    if(sessionStorage.getItem("session-id")!=null){
      this.username = sessionStorage.getItem("username");
      this.homeService.getGames().subscribe(
        (response) => {
          this.stubs = response;
          for(let i=0;i<this.stubs.length;i++){
            console.log(this.stubs[i]);
          }
        },
        (error) => {
          console.log("login failed");
          this.router.navigate([""]);
        })
    } else {
      this.router.navigate([""]);
    }
  }

}
