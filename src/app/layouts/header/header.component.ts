import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit{

  userEmail: string | undefined

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // @ts-ignore
    this.userEmail = JSON.parse(localStorage.getItem('user')).email
  }

  onLogOut() {
    this.authService.logOut()

    // TODO 8:27:47
  }
}
