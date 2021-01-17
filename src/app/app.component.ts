import { Router } from '@angular/router';
import { FbservisService } from './services/fbservis.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'uyg01';
  username:any;
  
  constructor(
    public fbservis : FbservisService,
    public router:Router
  ) { }
  ngOnInit() {
    var user = JSON.parse(localStorage.getItem("user"));
    this.username = user.displayName;
    }
    
  CikisYap(){
    this.fbservis.OturumKapat().then(d => {
      localStorage.removeItem("user")
      this.router.navigate(['/'])
    })
  }
}
