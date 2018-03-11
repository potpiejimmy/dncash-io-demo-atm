import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// Specials
import { NgQrScannerModule } from 'angular2-qrscanner';
import { LocalStorageModule } from 'angular-2-local-storage';

// App
import { AppComponent } from './app.component';
import { ScanComponent } from './routes/scan';
import { AppRoutes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    // App:
    ScanComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // Angular Material:
    MatToolbarModule,
    MatSnackBarModule,
    // Specials:
    NgQrScannerModule,
    LocalStorageModule.withConfig({ prefix: 'dncashio-demo', storageType: 'localStorage' }),
    // App:
    AppRoutes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
