import { MesajComponent } from './components/mesaj/mesaj.component';
import { AdminComponent } from './components/admin/admin.component';
import { LandingComponent } from './components/landing/landing.component';
import { DosyalarComponent } from './components/dosyalar/dosyalar.component';
import { KayitlarComponent } from './components/kayitlar/kayitlar.component';
import { KayitsilComponent } from './components/kayitsil/kayitsil.component';
import { KayitduzenleComponent } from './components/kayitduzenle/kayitduzenle.component';
import { KayitdetayComponent } from './components/kayitdetay/kayitdetay.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';




const redirectLogin = () => redirectUnauthorizedTo(['login']);
const routes: Routes = [

  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'dosya',
    component: DosyalarComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectLogin
    }
  }, 
  {
    path: 'iletisim',
    component: MesajComponent
  },
  {
    path: 'kayitlar',
    component: KayitlarComponent
  },
  {
    path: 'kayitdetay/:key',
    component: KayitdetayComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectLogin
    }
  },
  {
    path: 'kayitduzenle/:key',
    component: KayitduzenleComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectLogin
    }
  }, 
  {
    path: 'kayitsil/:key',
    component: KayitsilComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectLogin
    }
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
