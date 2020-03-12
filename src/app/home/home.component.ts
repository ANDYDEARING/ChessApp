import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private homeService: HomeService, private router: Router) { }

  ngOnInit() {
    if(sessionStorage.getItem("session-id")!=null){
      console.log(this.homeService.getGames());
    } else {
      this.router.navigate([""]);
    }
  }

}
