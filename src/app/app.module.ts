import { DosyalarComponent } from './components/dosyalar/dosyalar.component';
import { KayitlarComponent } from './components/kayitlar/kayitlar.component';
import { KayitsilComponent } from './components/kayitsil/kayitsil.component';
import { KayitduzenleComponent } from './components/kayitduzenle/kayitduzenle.component';
import { KayitdetayComponent } from './components/kayitdetay/kayitdetay.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { environment } from './../environments/environment';
import { HomeComponent } from './components/home/home.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { CKEditorModule } from 'ng2-ckeditor';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { LandingComponent } from './components/landing/landing.component';
import { AdminComponent } from './components/admin/admin.component';
import { MesajComponent } from './components/mesaj/mesaj.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    KayitdetayComponent,
    KayitduzenleComponent,
    KayitsilComponent,
    KayitlarComponent,
    DosyalarComponent,
    LandingComponent,
    AdminComponent,
    MesajComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CKEditorModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    AngularFireStorageModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
