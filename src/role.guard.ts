import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {LoginService} from './services/login.service';
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {

    constructor(private loginService: LoginService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const requiredRole = route.data['role'];
        const currentRole = this.loginService.getUserRole();
        if (currentRole === requiredRole) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }


}
