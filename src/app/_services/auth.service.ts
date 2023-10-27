import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router, private http:HttpClient  ) { }

  isAuthenticated():boolean{
    if (sessionStorage.getItem('token')!==null) {
      return true;      
    }
    return false;
  }

  canAccess(){
    if (!this.isAuthenticated()) {
      // redirect to login page
      this.router.navigate(['/login']);
    }
  }

  canAuthenticate(){
    if (this.isAuthenticated()) {
      // redirect to dashboard page
      this.router.navigate(['/dashboard']);
    }
  }

  register(name:string, email:string, password:string){
    return this.http
    .post<{idToken:string}>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDSYCCc7nsvAGKqMEdknU7vKRlf8PS8nfw',
      {displayName:name, email:email, password:password}
      );
  }

  storeToken(token:string){
    sessionStorage.setItem('token', token);
  }

  login(email:string,password:string){
    //send data to login api
    return this.http
    .post<{idToken:string}>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDSYCCc7nsvAGKqMEdknU7vKRlf8PS8nfw',
      {email:email, password:password}
    );
  }
  detail(){
    let token = sessionStorage.getItem('token');

    return this.http.post<{users:Array<{localId:string,displayName:string}>}>(
      'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDSYCCc7nsvAGKqMEdknU7vKRlf8PS8nfw',
      {idToken:token}
    );
  }

  removeToken(){
    sessionStorage.removeItem('token');
  }
}
