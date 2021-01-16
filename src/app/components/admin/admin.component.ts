
import { Uye } from './../../models/uye';
import { Component, OnInit } from '@angular/core';
import { FbservisService } from 'src/app/services/fbservis.service';
import { Router } from '@angular/router';
import { İletisim } from 'src/app/models/iletisim';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  secUye: Uye = new Uye();
  uid: string;
  username:any;
  uyeler:Uye[];
  mesajlar:İletisim[];
  constructor(
    public fbServis: FbservisService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.UyeListele()
    this.MesajListele()
    
    
  }
  YetkiliListele(){
    this.fbServis.YetkiliKullanıcıListele().snapshotChanges().subscribe(data => {
      this.uyeler = [];
      data.forEach(satir => {
        const y = { ...satir.payload.toJSON(), key: satir.key };
        this.uyeler.push(y as Uye);
      });
    });
  }
  MesajListele() {
    this.fbServis.MesajlarGetir().snapshotChanges().subscribe(data => {
      this.mesajlar = [];
      data.forEach(satir => {
        const y = { ...satir.payload.toJSON(), key: satir.key };
        this.mesajlar.push(y as İletisim);
      });
    });
  }

  UyeListele() {
    this.fbServis.UyeListele().snapshotChanges().subscribe(data => {
      this.uyeler = [];
      data.forEach(satir => {
        const y = { ...satir.payload.toJSON(), key: satir.key };
        this.uyeler.push(y as Uye);
      });
    });
  }
  Sil(a){
    this.fbServis.UyeSil(a).then(d => {
      this.router.navigate(['/admin']);
    });
  }
  SilMesaj(a){
    this.fbServis.MesajOkundu(a).then(d => {
      this.router.navigate(['/admin']);
    });
  }
  KayitYap() {
    this.fbServis.UyeOl(this.secUye).then(d => {
      d.user.updateProfile({
        displayName: this.secUye.adsoyad
      }).then();
      this.secUye.yetkilimi = true;
      this.secUye.uid = d.user.uid;
      
      localStorage.setItem("user", JSON.stringify(d.user));
      this.UyeEkle();
    }, err => {
      alert("hata")
    });
  }
  UyeEkle() {
    this.fbServis.YetkiliEkle(this.secUye).then(d => {
      this.router.navigate(['/kayitlar']);
    });
  }


}
