import { İletisim } from 'src/app/models/iletisim';
import { Component, OnInit } from '@angular/core';
import { FbservisService } from 'src/app/services/fbservis.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mesaj',
  templateUrl: './mesaj.component.html',
  styleUrls: ['./mesaj.component.css']
})
export class MesajComponent implements OnInit {

  secMesaj: İletisim = new İletisim();
  
  constructor(
    public fbServis: FbservisService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }
  Kaydet() {
    var tarih = new Date();
    this.secMesaj.date = tarih.getTime().toString();
    this.fbServis.MesajEkle(this.secMesaj).then(d => {
      this.router.navigate(['/kayitlar']);
    });
  }

}
