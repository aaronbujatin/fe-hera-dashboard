import { Component, ElementRef } from '@angular/core';
import { navbarData } from './nav-data';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {


  isSidebarOpen = false;
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  navData = navbarData;

}

