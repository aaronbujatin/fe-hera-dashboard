import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../model/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  private readonly LOCAL_API = "http://localhost:8080";

  public login(login: Login) {
    return this.httpClient.post(`${this.LOCAL_API}/api/v1/auth/signin`, login);
  }

  public setToken(jwt: string) {
    localStorage.setItem("Jwt", jwt);
  }

  public getToken(): string {
    return localStorage.getItem("Jwt");
  }

  public clearLocalStorage() {
    localStorage.clear();
  }


}
