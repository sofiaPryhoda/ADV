import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  showMe:boolean = false;
  enabledBtn:boolean = false;

  show(){
    this.showMe!=this.showMe;
  }
}
