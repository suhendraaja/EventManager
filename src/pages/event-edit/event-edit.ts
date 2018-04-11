import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event'


@IonicPage({segment: 'event-detail/:eventId' })
@Component({
  selector: 'page-event-edit',
  templateUrl: 'event-edit.html',
})
export class EventEditPage {
  public currentEvent: any ={};
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public eventProvider: EventProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventEditPage');
    //ambil data dari firebase
    this.eventProvider.getEventDetail(this.navParams.get('eventId'))
      .on('value', eventSnapshot => {
        this.currentEvent = eventSnapshot.val();
        this.currentEvent.id = eventSnapshot.key;
      });
  }

  //ambil data event untuk di edit\
  editEvent(
    eventName: string,
    eventDate: string,
    eventPrice: number,
    eventContact: string
  ): void {
    this.eventProvider
      .editEvent(eventName, eventDate, eventPrice, eventContact)
      .then(editEvent => {
        this.navCtrl.pop();
      });
  }

}
