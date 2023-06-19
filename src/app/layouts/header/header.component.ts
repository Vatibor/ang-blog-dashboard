import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit{

  userEmail: string | undefined
  isLoggedIn$: Observable<boolean> | undefined

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // @ts-ignore
    this.userEmail = JSON.parse(localStorage.getItem('user')).email
    this.isLoggedIn$ = this.authService.isLoggedIn()
  }

  onLogOut() {
    this.authService.logOut()

  }
}
