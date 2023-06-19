import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";
import {ToastrService} from "ngx-toastr";

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)
  const authService = inject(AuthService)
  const toastr = inject(ToastrService)


  if(authService.isLoggedInGuard){
    return true
  }else{
    toastr.warning('You don\'t have permission to access this page!')
    router.navigate(['/login'])
    return false
  }
};
