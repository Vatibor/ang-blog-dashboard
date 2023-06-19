import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private toastr: ToastrService, private router: Router) {}

  login(email:string, password:string) {
    this.afAuth.signInWithEmailAndPassword(email, password).then(logRef => {
      this.toastr.success('Logged In Successfeully!')
      this.router.navigate(['/'])
      this.loadUser()
    }).catch(e => {
      this.toastr.warning(e)
    })
  }

  loadUser(){
    this.afAuth.authState.subscribe(user => {
      // console.log(JSON.parse(JSON.stringify(user)))

      //   save email address to the local storage
      localStorage.setItem('user', JSON.stringify(user))
    })
  }

  logOut() {
    this.afAuth.signOut().then(() => {
      this.toastr.success('User Logged Out!')
      this.router.navigate(['/login'])
    })
  }
}
