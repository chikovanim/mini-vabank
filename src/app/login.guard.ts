import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(@Inject(Router) private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    const authenticated = false;//sessionStorage.getItem("username") !== undefined && sessionStorage.getItem("username") !== null;

    if (authenticated) {
      this.router.navigate(['/clients']);
      return false;
    }

    return true;
  }
}
