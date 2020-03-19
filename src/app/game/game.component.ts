import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  gameId:string;
  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(param => this.gameId = param['id']);
  }

}
