import { Uye } from './../models/uye';
import { Kayit } from './../models/kayit';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, snapshotChanges } from '@angular/fire/database'
import { AngularFireAuth } from '@angular/fire/auth'
import { Yorum } from '../models/yorum';
import { İletisim } from '../models/iletisim';

@Injectable({
  providedIn: 'root'
})
export class FbservisService {
  private dbKayit = '/Kayitlar';
  private dbUye = '/Uyeler';
  private dbYorum = '/Yorumlar';
  private dbİletisim = '/Iletisim';

  kayitRef: AngularFireList<Kayit> = null;
  uyeRef: AngularFireList<Uye> = null;
  yorumRef: AngularFireList<Yorum> = null;
  iletisimRef: AngularFireList<İletisim> = null;

  constructor(
    
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth
  ) {
    this.kayitRef = db.list(this.dbKayit);
    this.uyeRef = db.list(this.dbUye);
    this.yorumRef = db.list(this.dbYorum);
    this.iletisimRef = db.list(this.dbİletisim);
  }

  OturumAc(mail: string, parola: string) {
    return this.afAuth.signInWithEmailAndPassword(mail, parola);
  }
  OturumKapat() {
    return this.afAuth.signOut();
  }
  OturumKontrol() {
    if (localStorage.getItem("user")) {
      return true;
    } else {
      return false;
    }
  }

  UyeListele(){
    return this.db.list("/Uyeler", q => q.orderByChild("uid").limitToLast(10));
  }
  UyeOl(uye: Uye) {
    return this.afAuth.createUserWithEmailAndPassword(uye.mail, uye.parola);
  }

  UyeByName(name: string) {
    return this.db.list("/Uyeler", q => q.orderByChild("adsoyad").startAt(name));
  }
  UyeEkle(uye: Uye) {
    return this.uyeRef.push(uye);
  }
  UyeDuzenle(uye:Uye){
    alert(uye)
    return this.uyeRef.update(uye.key, uye);
  }
  UyeSil(uid: string) {
    return this.uyeRef.remove(uid);
  }

  KayitListeleByUID(uid: string) {
    return this.db.list("/Kayitlar", q => q.orderByChild("uid").equalTo(uid));
  }
  KayitListeleByKategori(kategori: string) {
    return this.db.list("/Kayitlar", q => q.orderByChild("kategori").equalTo(kategori));
  }
  KayitListele() {
    return this.kayitRef;
  }
  KayitByKey(key: string) {
    return this.db.object("/Kayitlar/" + key);
  }
  KayitEkle(kayit: Kayit) {
    return this.kayitRef.push(kayit);
  }
  KayitDuzenle(kayit: Kayit) {
    return this.kayitRef.update(kayit.key, kayit);
  }
  KayitSil(key: string) {
    return this.kayitRef.remove(key);
  }

  
  SonUyeler(){
    return this.db.list("/Uyeler", q => q.orderByChild("uid").limitToLast(5));
  }

  YorumByKey(key: string) {
    return this.db.object("/Yorumlar/" + key);
  }
  YorumListele(icerikid: string) {
    return this.db.list("/Yorumlar", q => q.orderByChild("icerik").equalTo(icerikid));
  }
  YorumEkle(kayit: Yorum) {
    return this.yorumRef.push(kayit);
  }
  YorumDuzenle(kayit: Yorum) {
    return this.yorumRef.update(kayit.key, kayit);
  }
  YorumSil(key: string) {
    return this.yorumRef.remove(key);
  }


  MesajlarGetir(){
    return this.db.list("/Iletisim", q => q.orderByChild("kontrol").equalTo(false).limitToLast(10));
  }
  MesajEkle(mesaj:İletisim){
    return this.iletisimRef.push(mesaj);
  }
  MesajOkundu(key: string){
    return this.iletisimRef.remove(key);
  }


  
}
