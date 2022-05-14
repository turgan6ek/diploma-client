import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from "rxjs";
import {AuthService} from "../services/auth.service";
import {User} from "../models/user";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {
  isLoggedIn : Observable<User>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.isLoggedIn = this.authService.loggedIn();
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
    console.log(this.route)
  }

  showLink(): boolean {
    return false;
  }

  navCalendar(): void {
    this.router.navigate(['/calendar']);
  }
  navReports(): void {
    this.router.navigate(['/report']);
  }
  navDashboard(): void {
    this.router.navigate(['/dashboards']);
  }
  logout(): void {
    this.authService.logout();
  }
}
