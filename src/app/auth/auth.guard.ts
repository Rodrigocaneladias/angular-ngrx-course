import { tap } from 'rxjs/operators';
import { isLoggedIn } from './auth.selectors';
import { AppState } from './../reducers/index';
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import { select } from '@ngrx/store';
import {Store} from "@ngrx/store";



@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{

    constructor(private store: Store<AppState>, 
                private router: Router){}

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean>  {  
        return this.store.pipe(
            select(isLoggedIn),
            tap( logged => {
                if(!logged){
                    this.router.navigateByUrl('/login');
                }
            })
        )
    }
}