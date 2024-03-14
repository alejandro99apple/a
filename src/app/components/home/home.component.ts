import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  showFiller = false;
  sidebarstatus = false;
  
  constructor(
    private authService:AuthService,

  ){}

  sidebarToggler(){
    this.sidebarstatus = !this.sidebarstatus;
  }
}
