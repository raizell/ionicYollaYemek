import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirestoreService } from '../firestore.service';
import { Yemek } from '../yemek-model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  deger:Yemek = {yemek:null, adet:null, fiyat:null, tarih:null};
  kayitlar:any;
  userID:string;

  constructor(
    public firestoreService:FirestoreService, 
    public alertController:AlertController, 
    private angularFireAuth:AngularFireAuth,
    private router:Router,
    ) {
    
    this.angularFireAuth.authState.subscribe(kullanici => {
      if (kullanici) {
        this.userID = kullanici.uid;
        console.log(this.userID);
        this.listele();
      } else {
        this.router.navigateByUrl('/welcome');
      }
    })
  }


  listele()
  {
    this.firestoreService.kayitlariOku('tarih','desc',this.userID).subscribe(sonuc => {this.kayitlar = sonuc; console.log(sonuc); }, err => { console.log(err);});
  }


  yeniKayit()
  {
    this.firestoreService.yeniKayit(this.deger,this.userID).then(sonuc=> { 
      console.log(sonuc.id);
      
      this.deger.yemek = null;
      this.deger.adet = null;
      this.deger.fiyat = null;
    }).catch(err => {console.log(err)});
  }

  kayitGuncelle(id, deger)
  {
    this.firestoreService.kayitGuncelle(id, deger,this.userID);
    console.log(deger)

  }

  kayitSil(id)
  {
    this.firestoreService.kayitSil(id,this.userID);
    console.log('Kayıt Silindi!')

  }

  async presentAlertConfirm(id) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Kayıt Sil',
      message: 'Bu kaydı silmek istiyor musunuz?',
      buttons: [
        {
          text: 'Vazgeç',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sil',
          handler: () => {
            this.kayitSil(id);
          }
        }
      ]
    });
  
    await alert.present();
  }

  async presentAlertPrompt(kayit) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Ürün Güncelle',
      inputs: [
        {
          name: 'yemek',
          type: 'text',
          id: 'yemekID',
          value: kayit.payload.doc.data().yemek,
          placeholder: 'Ürün Giriniz'
        },
        {
          name: 'adet',
          type: 'number',
          id: 'adetID',
          value: kayit.payload.doc.data().adet,
          placeholder: 'Adet Giriniz'
        },
        {
          name: 'fiyat',
          type: 'text',
          id: 'fiyatID',
          value: kayit.payload.doc.data().fiyat,
          placeholder: 'Fiyat Giriniz'
        },
      ],
      buttons: [
        {
          text: 'Vazgeç',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Güncelle',
          handler: (sonuc) => {
  
            let guncellenecekData = {'yemek':null,'adet':null,'fiyat':null, tarih:null};
  
            if (sonuc.yemek !== '' && sonuc.adet !=='' && sonuc.fiyat !=='' && (sonuc.yemek !== kayit.payload.doc.data().yemek || sonuc.adet !== kayit.payload.doc.data().adet || sonuc.fiyat !== kayit.payload.doc.data().fiyat)) {
              guncellenecekData.tarih = Math.floor(Date.now() / 1000);
              guncellenecekData.yemek = sonuc.yemek;
              guncellenecekData.adet = sonuc.adet;
              guncellenecekData.fiyat = sonuc.fiyat;
            this.kayitGuncelle(kayit.payload.doc.id, guncellenecekData);
            }
            else {
              console.log('Değişiklik Yok');
            }
            
  
          }
        }
      ]
    });
  
    await alert.present();
  }

  logout()
  {
    this.router.navigateByUrl('/welcome');
  }

  async logoutalert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Çıkış yapmak istiyor musunuz?',
      buttons: [
        {
          text: 'Hayır',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Evet',
          handler: () => {
            this.logout();
          }
        }
      ]
    });

    await alert.present();
  }

  async urunEkle() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Ürün Ekle',
      inputs: [
        {
          name: 'yemek',
          type: 'text',
          id: 'yemekID',
          value: this.deger.yemek,
          placeholder: 'Ürün Giriniz'
        },
        {
          name: 'adet',
          type: 'number',
          id: 'adetID',
          value:  this.deger.adet,
          placeholder: 'Adet Giriniz'
        },
        {
          name: 'fiyat',
          type: 'text',
          id: 'fiyatID',
          value:  this.deger.fiyat,
          placeholder: 'Fiyat Giriniz'
        },
      ],
      buttons: [
        {
          text: 'Vazgeç',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ekle',
          handler: (sonuc) => {
            this.deger.tarih = Math.floor(Date.now() /  1000);
            this.deger.yemek = sonuc.yemek;
            this.deger.adet = sonuc.adet;
            this.deger.fiyat = sonuc.fiyat;
            this.yeniKayit();
          }
        }
      ]
    });
  
    await alert.present();
  }

  detaylar()
  {
    
    this.router.navigateByUrl('/yemek-detay');
  }
}
