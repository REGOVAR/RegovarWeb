import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './core/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Regovar';

  constructor(private service: AuthenticationService)  { }

  ngOnInit()
  {
    this.service.do();
  }
}
