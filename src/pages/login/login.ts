import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Alert, AlertController, Loading, LoadingController} from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HomePage } from '../../pages/home/home';
import { AuthProvider } from '../../providers/auth/auth' ;

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
public loginForm: FormGroup;
public loading: Loading;

  constructor(    
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    public formBuilder: FormBuilder) {

      //validasi form
  }

  loginUser(){
    //baca ctrlname
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    //cek dari firebase via provider
    this.authProvider.loginUser(email,password).then(
      authData => {
        this.loading.dismiss().then(() => {
          this.navCtrl.setRoot(HomePage);
        });
      },
      error => {
        this.loading.dismiss().then(() => {
          const Alert: Alert = this.alertCtrl.create({
            message: error.message,
            buttons: [{
              text: 'Ok',
              role: 'cancel' 
            }]
          });
            alert.present();
          });
        });
        this.loading = this.loadingCtrl.create();
        this.loading.present();
      }
  }

  //goToSignUp(){  }

 // goToResetPassword(){  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
