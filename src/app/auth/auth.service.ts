import { Injectable, EventEmitter } from '@angular/core';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

interface AuthResponseData {
    username:string;
    password:string;
    valid:string;
}

@Injectable({
    providedIn:'root'
})
export class AuthService {

    user=new EventEmitter<User>();

    constructor(private http:HttpClient) {

    }

    signup(username:string,password:string) {
       return this.http.post<AuthResponseData>('http://localhost:8084/register',
        {
            "username": username,
            "password": password,
            "valid": true
        }).pipe(tap(resData=>{
            if(resData.valid) {
                const user=new User(resData.username,true);
                this.user.emit(user);
                sessionStorage.setItem('userData',JSON.stringify(user));
            } 
        }))
    }

    login(username:string,password:string) {
       return this.http.post<AuthResponseData>('http://localhost:8084/login',
        {
            "username": username,
            "password": password,
            "valid": true
        }).pipe(tap(resData=>{
            if(resData.valid) {
                const user=new User(resData.username,true);
                this.user.emit(user);
                sessionStorage.setItem('userData',JSON.stringify(user));
            }
        }))
    }

    logout() {
        this.user.emit(null);
        sessionStorage.removeItem('userData');
    }

    autoLogin() {
     const user:User= JSON.parse(sessionStorage.getItem('userData'));
        if(!user) {
        return;
        } else {
        this.user.emit(user);
        }
    }
}