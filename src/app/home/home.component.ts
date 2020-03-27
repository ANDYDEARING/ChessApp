import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Router } from '@angular/router';
import { GameStub } from '../models/GameStub';
import { min } from 'rxjs/operators';

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
      this.checkForUpdate();
    } else {
      this.router.navigate([""]);
    }
  }
  getTimeDistance(game:GameStub):string{
    let value:string;
    let units:string;
    let utcMoveDate = new Date(game.lastMove.toString());
    let milliseconds = Date.now() - utcMoveDate.getTime();
    // milliseconds += (new Date().getTimezoneOffset()*60*1000);
    let minutes = milliseconds/60000;
    if(minutes < 1){
      return "<1 minute ago"
    }else if(minutes < 60){
      value = Math.round(minutes).toString();
      units = "minute";
    } else if(minutes < 60*24){
      value = (Math.round(minutes/60)).toString();
      units = "hour";
    } else {
      value = (Math.round(minutes/(60*24))).toString();
      units = "day";
    }
    if(parseInt(value) > 1){
      units += "s"
    }
    
    return value + " " + units + " ago";
  }
  goToGame(game:GameStub){
    this.router.navigate(["game/" + game.gameID]);
  }
  checkForUpdate(){
    this.username = sessionStorage.getItem("username");
      this.homeService.getGames().subscribe(
        (response) => {
          this.stubs = response;
          console.log("0 index winner", this.stubs[0].winner);
        },
        (error) => {
          console.log(error);
        })
  }
}
