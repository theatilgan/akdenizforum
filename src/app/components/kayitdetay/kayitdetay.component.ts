import { Uye } from './../../models/uye';

import { Yorum } from './../../models/yorum';
import { Kayit } from './../../models/kayit';
import { FbservisService } from './../../services/fbservis.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-kayitdetay',
  templateUrl: './kayitdetay.component.html',
  styleUrls: ['./kayitdetay.component.css']
})
export class KayitdetayComponent implements OnInit {
  key: string;
  secKayit: Kayit = new Kayit();
  secYorum: Yorum = new Yorum();
  username:string;
  uid: string;
  yorumlar: Yorum[];
  yetkiliList:Uye[];
  userB: Uye = new Uye();
  
  constructor(
    public route: ActivatedRoute,
    public fbServis: FbservisService,
    public router: Router
  ) { }

  ngOnInit() {

    var user = JSON.parse(localStorage.getItem("user"));
    this.userB = user;
    this.uid = user.uid;
    this.username = user.displayName;
    this.route.params.subscribe(p => {
      this.key = p.key;
      this.KayitGetir();
      this.YorumListele();
    });
    console.log(this.key)
    console.log(this.yorumlar)
  }
  KayitGetir() {
    this.fbServis.KayitByKey(this.key).snapshotChanges().subscribe(data => {
      const y = { ...data.payload.toJSON(), key: this.key };
      this.secKayit = (y as Kayit);
    });
  }

  YorumListele() {
    this.fbServis.YorumListele(this.key).snapshotChanges().subscribe(data => {
      this.yorumlar = [];
      data.forEach(satir => {
        const y = { ...satir.payload.toJSON(), key: satir.key };
        this.yorumlar.push(y as Yorum);
      });
    });
  }
  Sil(key) {
    this.fbServis.KayitSil(key).then(d => {
      this.router.navigate(['/kayitlar']);
    });
  }
  YorumSil(key) {
    this.fbServis.YorumSil(key).then(d => {
      this.router.navigate(['/kayitlar' ,this.key]);
    });
  }

  

  Kaydet() {
    var user = JSON.parse(localStorage.getItem("user"));
    this.secYorum.uid = user.uid;
    var tarih = new Date();
    this.secYorum.date = tarih.getTime().toString();
    this.secYorum.icerik = this.key;
    this.secYorum.username = this.username;
    this.fbServis.YorumEkle(this.secYorum).then(d => {
      this.router.navigate(['/kayitlar',this.key]);
    });
  }
}
