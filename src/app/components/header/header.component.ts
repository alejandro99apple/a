import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  opened! : boolean;

  ngOnInit(){
    this.opened = true
  }
  toggleSidebar(){
    this.opened = !this.opened;
    this.toggleSidebarForMe.emit();
  }
}
