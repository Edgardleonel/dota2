import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private db: AngularFirestore) { }

  createUser = data => this.db.collection('user').add(data);

  getCurrentUser(email) {
    return this.db.collection('user', ref => ref.where('email', '==', email))
    .snapshotChanges();
  }
  
  saveAccount(data, key) {
    return this.db.collection('user').doc(key).update(data);
  }

}
