import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient:HttpClient ,
    private router:Router
  ) { }

  token!:any;


  signUp(user:any){

    return this.httpClient.post(environment.apiUrl+'/api/auth/signup', user)

  }

  signIn(user:FormGroup){
    return this.httpClient.post(environment.apiUrl+'/api/auth/signin', user)
  }

  logout(){
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/sign-in']);
  }

  saveToken(token:any){
    localStorage.setItem('token',token)
  }

  saveUser(user:User){
    localStorage.setItem('user',JSON.stringify(user))
  }

  me(){
    return this.httpClient.get<User>(environment.apiUrl+'/api/auth/me?token='+localStorage.getItem('token'))
  }

  isLogged() {

    this.token = localStorage.getItem('token')

    if (this.token) {
      return true;
    }
    else {
      this.router.navigate(['/sign-in']);
      return false
    }
  }
}
