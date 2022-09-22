import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface UserLogin {
  username: string;
  password: string;
}

interface UserRegister {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  bio: string;
}

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(public fireStoreServices: AngularFirestore) {}

  createUser = (user: UserRegister) => {
    const res = this.fireStoreServices.collection('users').add(user);
    console.log(res);
  };
  userLogin = (user: UserLogin) => {
    const res = this.fireStoreServices.collection('users').get();
    console.log(res);
  };
}
