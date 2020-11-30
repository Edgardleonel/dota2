import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-header-dashboard',
  templateUrl: './header-dashboard.component.html',
  styleUrls: ['./header-dashboard.component.scss']
})
export class HeaderDashboardComponent implements OnInit {
public accountName;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    const userStorage = localStorage.getItem('user');
    const userJson = JSON.parse(userStorage);
    this.accountName = userJson.name;
  }

  logout() {
    this.auth.logout();
    setTimeout(() => {
      this.router.navigateByUrl('/');
      localStorage.removeItem('user');
    }, 1500);
  }


}
