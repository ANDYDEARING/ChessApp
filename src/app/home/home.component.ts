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

  constructor(private homeService: HomeService, private router: Router) { }

  ngOnInit() {
    if(sessionStorage.getItem("session-id")!=null){
      let stubs:GameStub[];
      // stubs = this.homeService.getGames();
      this.homeService.getGames().subscribe(
        (response) => {
          stubs = response;
          console.log(stubs);
        },
        (error) => {
          console.log("login failed");
        })
    } else {
      this.router.navigate([""]);
    }
  }

}
