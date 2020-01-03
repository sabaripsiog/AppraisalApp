import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(){};
  //showHeader = true;
  //showNavbar = false;
  //showFooter = false;
  

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}
}
