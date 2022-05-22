import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';
import { User } from './user.class';

@Injectable({
  providedIn: 'root'
})
export class FirebaseauthService {

  constructor(public firebaseAuth: AngularFireAuth,private alertController:AlertController) { }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Hata',
      message: msg,
      buttons: ['Tamam']
    });

    await alert.present();
  }

  async EpostaParolaKayitOl(user: User) {
    try {
      return await this.firebaseAuth.createUserWithEmailAndPassword(user.email, user.password);
    } catch (error) {
      this.presentAlert(error.message);
      console.log('Kullanıcı Kayıt Hatası : ', error);
    }
    }

  async EpostaParolaGirisYap(user: User) {
    try {
      return await this.firebaseAuth.signInWithEmailAndPassword(user.email, user.password);
    } catch (error) {
      this.presentAlert(error.message);
      console.log('Kullanıcı Giriş Hatası : ', error);
    }
    }

    async sifreSifirla(eposta) {
      try {
        return await this.firebaseAuth.sendPasswordResetEmail(eposta);
     }  catch (error) {
      this.presentAlert(error.message);
      console.log('Şifre Sıfırlama Hatası : ', error);
     }
    }

}
