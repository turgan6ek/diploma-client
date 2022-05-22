import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from "rxjs";
import {AuthService} from "../services/auth.service";
import {User} from "../models/user";
import {CometchatComponent} from "../pages/apps/cometchat/cometchat.component";
import {MatDialog} from "@angular/material/dialog";
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
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    this.isLoggedIn = this.authService.loggedIn();
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
  }

  showLink(): boolean {
    return false;
  }

  navCalendar(): void {
    this.router.navigate(['/apps/calendar']);
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

  openChat() {
    const dialogRef = this.dialog.open(CometchatComponent, {
      height: '600px',
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
