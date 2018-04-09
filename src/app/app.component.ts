import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase, { Unsubscribe } from 'firebase';    //karena istall dari npm
import { firebaseConfig } from './credential';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => { //promise
      //membaca API key dari firebase untuk pertama kali aplikasi di load
      firebase.initializeApp(firebaseConfig);

      //cek user login / belum
      const unsubscribe: Unsubscribe =
        firebase.auth()
        .onAuthStateChanged(user => {
            if(!user){
              this.rootPage = 'LoginPage';
              unsubscribe();
            } else {
              this.rootPage = HomePage;
              unsubscribe();
            }
        })

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

