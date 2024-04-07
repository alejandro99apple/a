import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  constructor(
    private router:Router,
    private generalService: GeneralService,
    private auth:AuthService
    ){}

  isAdmin = false;
  user!:User;

  opened! : boolean;

  ngOnInit(){
    this.opened = true;
    this.user = this.generalService.getUser();
    console.log('usuario: '+this.user.username)
    if(this.user.username == 'admin'){
      this.isAdmin = true;
    }
  }

  toggleSidebar(){
    this.opened = !this.opened;
    this.toggleSidebarForMe.emit();
  }

  Navigate(route:string){
    this.router.navigate(['/home/'+route]);
  }

  onLogout(){
    this.auth.logout();
  }

}
