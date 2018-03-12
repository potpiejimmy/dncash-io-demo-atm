import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

// Specials
import { NgQrScannerModule } from 'angular2-qrscanner';
import { LocalStorageModule } from 'angular-2-local-storage';

// App
import { AppComponent } from './app.component';
import { ScanComponent } from './routes/scan';
import { AppRoutes } from './app.routes';
import { CashApiService } from './services/cashapi.service';
import { AuthHttp } from './services/authhttp.service';

@NgModule({
  declarations: [
    AppComponent,
    // App:
    ScanComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // Angular Material:
    MatToolbarModule,
    MatSnackBarModule,
    MatButtonModule,
    // Specials:
    NgQrScannerModule,
    LocalStorageModule.withConfig({ prefix: 'dncashio-demo', storageType: 'localStorage' }),
    // App:
    AppRoutes
  ],
  providers: [
    AuthHttp,
    CashApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
