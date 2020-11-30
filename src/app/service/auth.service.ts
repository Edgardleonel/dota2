import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) {}

  register = (data) => this.auth.createUserWithEmailAndPassword(data.email, data.password);

  login = (data) => this.auth.signInWithEmailAndPassword(data.email, data.password);

  logout = () =>  this.auth.signOut();

}
