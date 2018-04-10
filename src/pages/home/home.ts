import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

//melihat profil
goToProfile():void{
this.navCtrl.push('ProfilePage');
}
//membuat event
goToCreate():void{
  this.navCtrl.push('EventCreatePage');
}
//melihat event
goToList():void{
  this.navCtrl.push('EventListPage');
}

}
