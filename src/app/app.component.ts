import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'fe-hera-dashboard';

  ngOnInit(): void {
    initFlowbite();
  }

  constructor(private router: Router) {}


  isLoginPage(): boolean {
    return this.router.url === '/login';
  }


}
