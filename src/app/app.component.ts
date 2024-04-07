import { Component, OnInit } from '@angular/core';
import { GeneralService } from './services/general.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Control de Órdenes de Trabajo';
  constructor(
    private generalService:GeneralService
  ){
  }
  ngOnInit(){
    this.generalService.generateWorkers();
    this.generalService.generateSystemsAndSubSystems();
  }

}
