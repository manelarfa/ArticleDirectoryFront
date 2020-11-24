import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    isAuthenticated: boolean;
    constructor(private router:Router) {

    }

    canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot)
    :Observable<boolean> | Promise<boolean> | boolean {
        const user:User= JSON.parse(sessionStorage.getItem('userData'));
        if(!user) {
            this.router.navigate(['/auth']);
            return false;
        } else {
        return true;
        }
    }
}