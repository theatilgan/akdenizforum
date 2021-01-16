import { Uye } from './../../models/uye';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Kayit } from 'src/app/models/kayit';
import { Yorum } from 'src/app/models/yorum';
import { FbservisService } from 'src/app/services/fbservis.service';

@Component({
  selector: 'app-kayitlar',
  templateUrl: './kayitlar.component.html',
  styleUrls: ['./kayitlar.component.css']
})
export class KayitlarComponent implements OnInit {
  secKayit: Kayit = new Kayit();
  adsoyad: string;
  uid: string;
  username:any;
  kategori:any;
  Kategoriler: any[] = [
    { Name: 'Genel'},
    { Name: 'E-Spor'},
    { Name: 'Girişimcilik'},
    { Name: 'Dağcılık'},
    { Name: 'Kampçılık'},
    { Name: 'Bisiklet'},
    { Name: 'Havacılık'},
    { Name: 'Diğer'},
    ];
  curKat: any;
  kayitlar: Kayit[];
  uyeler:Uye[];
  constructor(
    public fbServis: FbservisService,
    public router: Router
  ) { }

  ngOnInit() {
    this.KayitListele();
    this.SonUye();
    var user = JSON.parse(localStorage.getItem("user"));
    if(this.fbServis.OturumKontrol() == true){
      this.uid = user.uid;
      this.adsoyad = user.displayName;
      this.username = user.displayName;
    }
    
    
  }
  OturumKapat() {
    this.fbServis.OturumKapat().then(d => {
      localStorage.removeItem("user");
      this.router.navigate(['/login']);
    });
  }

  SonUye(){
    this.fbServis.SonUyeler().snapshotChanges().subscribe(data => {
      this.uyeler = [];
      data.forEach(satir => {
        const y = { ...satir.payload.toJSON(), key: satir.key };
        this.uyeler.push(y as Uye);
      });
    });
  }

  KayitGetirKullanici(){
    this.fbServis.KayitListeleByUID(this.uid).snapshotChanges().subscribe(data => {
      this.kayitlar = [];
      data.forEach(satir => {
        const y = { ...satir.payload.toJSON(), key: satir.key };
        this.kayitlar.push(y as Kayit);
      });
    });
  }

  KayitListele() {
    this.fbServis.KayitListele().snapshotChanges().subscribe(data => {
      this.kayitlar = [];
      data.forEach(satir => {
        const y = { ...satir.payload.toJSON(), key: satir.key };
        this.kayitlar.push(y as Kayit);
      });
    });
  }
  KategoriyeGore(a){
    {
      this.fbServis.KayitListeleByKategori(a).snapshotChanges().subscribe(data => {
        this.kayitlar = [];
        data.forEach(satir => {
          const y = { ...satir.payload.toJSON(), key: satir.key };
          this.kayitlar.push(y as Kayit);
        });
      });
    }
  }
  Kaydet() {
    var user = JSON.parse(localStorage.getItem("user"));
    this.secKayit.uid = user.uid;
    var tarih = new Date();
    this.secKayit.kayTarih = tarih.getTime().toString();
    this.secKayit.duzTarih = tarih.getTime().toString();
    this.secKayit.username = this.adsoyad;
    this.secKayit.kategori = this.curKat;
    this.secKayit.baslik = "null";
    this.fbServis.KayitEkle(this.secKayit).then(d => {
      this.router.navigate(['/kayitlar']);
    });
  }
  KategoriSec(kategori: any){
    console.log(kategori);
    this.curKat = kategori;
  }
  Sil(key) {
    this.fbServis.KayitSil(key).then(d => {
      this.router.navigate(['/kayitlar']);
    });
  }
  

}
