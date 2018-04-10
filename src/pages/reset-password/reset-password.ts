import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  Alert, AlertController,
  Loading, LoadingController
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
  public resetPasswordForm: FormGroup;
  public loading: Loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authProvider: AuthProvider,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder) {

    // cek validasi form
    this.resetPasswordForm = formBuilder.group({
      email: ['', Validators.compose(
        [Validators.required]
      )]
    });
  }

  // proses reset password user
  resetPassword(): void {
    // cek form sudah valid atau belum
    if (!this.resetPasswordForm.valid) {    // belum valid
      console.log(`Form belum valid: ${this.resetPasswordForm.value}`);
    } else {        // sudah valid
      const email: string = this.resetPasswordForm.value.email;
      // baca dari firebase
      this.authProvider.resetPassword(email).then(
        user => {       // resolve
          const alert: Alert = this.alertCtrl.create({
            message: 'Cek email untuk reset password!',
            buttons: [{
              text: 'Yes',
              role: 'cancel',
              handler: () => {
                this.navCtrl.pop();
              }
            }]
          });
          alert.present();
        },
        error => {      // reject
          const errorAlert = this.alertCtrl.create({
            message: error.message,
            buttons: [{
              text: 'Ok',
              role: 'cancel'
            }]
          });
          errorAlert.present();
        }
      );
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }

}
