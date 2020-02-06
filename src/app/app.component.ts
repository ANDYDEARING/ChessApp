import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ChessApp';

  onClick($event){
    console.log($event.toElement);
    $event.toElement.classList.add("border-blue");
  }
}
