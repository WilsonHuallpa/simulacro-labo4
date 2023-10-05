import { Injectable } from '@angular/core';

import { Firestore, addDoc, collection } from '@angular/fire/firestore';
// import { Firestore, addDoc, collection } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: Firestore) {}

  addActores(data: any): Promise<any> {
    const aCollection = collection(this.firestore, 'actores');
    return addDoc(aCollection, data);
  }
}
