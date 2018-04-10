//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Reference, ThenableReference } from '@firebase/database-types';

@Injectable()
export class EventProvider {
  public eventListRef: Reference;

  constructor() {
    console.log('Hello EventProvider Provider');
    //baca dari firebase
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.eventListRef = firebase.database()
          .ref(`/userProfile/${user.uid}/eventList`);
      }
    });
  }
  //membuat event baru
  createEvent(
    eventName: string,
    eventDate: string,
    eventPrice: number,
    eventContact: string
  ): ThenableReference {
    return this.eventListRef.push({
      name: eventName,
      date: eventDate,
      price: eventPrice * 1,
      contact: eventContact
    });
  }
  //lihat daftar event
  getEventList(): Reference {
    return this.eventListRef;
  }

  //melihat detail event
  getEventDetail(eventId: string): Reference {
    return this.eventListRef.child(eventId);
  }
}


