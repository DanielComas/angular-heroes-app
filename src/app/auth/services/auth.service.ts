import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Auth} from "../interfaces/auth.interface";
import {map, Observable, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  get auth(): Auth {
    return { ...this._auth! };
  }

  constructor( private http: HttpClient ) { }

  verificaAutenticacion(): Observable<boolean> {
    if ( !localStorage.getItem('token_heroeApp') ) {
      return of(false);
      //return false;
    }

    //return of(true);
    return this.http.get<Auth>(`${ this.baseUrl }/usuarios/1`)
      .pipe(
        map( auth => {
          this._auth = auth;
          return true;
        })
      );
  }

  login(): Observable<Auth> {
    return this.http.get<Auth>(`${ this.baseUrl }/usuarios/1`)
      .pipe(
        tap( auth => {
          this._auth = auth;
          localStorage.setItem('token_heroeApp', auth.id);
        } )
      );
  }

  logout() {
    localStorage.removeItem('token_heroeApp');
    this._auth = undefined;
  }

}
