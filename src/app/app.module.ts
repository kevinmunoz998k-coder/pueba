import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Importaciones de Capacitor
import { Camera } from '@capacitor/camera';
import { App } from '@capacitor/app';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot({
      mode: 'ios' // Esto proporciona una experiencia consistente en todas las plataformas
    }), 
    AppRoutingModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    this.initializeApp();
  }

  private initializeApp() {
    // La cámara solicitará permisos automáticamente cuando sea necesario
    console.log('App initialized');
  }
}
