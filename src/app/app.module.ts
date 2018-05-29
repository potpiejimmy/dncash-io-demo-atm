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
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { NgxBarcodeModule } from 'ngx-barcode';
import { LocalStorageModule } from 'angular-2-local-storage';

// App
import { AppComponent } from './app.component';
import { ScanComponent } from './routes/scan';
import { AppRoutes } from './app.routes';
import { CashApiService } from './services/cashapi.service';
import { AuthHttp } from './services/authhttp.service';
import { NoScanComponent } from './routes/noscan';
import { CashComponent } from './routes/cash';
import { AppService } from './services/app.service';

@NgModule({
  declarations: [
    AppComponent,
    // App:
    ScanComponent,
    NoScanComponent,
    CashComponent
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
    NgxQRCodeModule,
    NgxBarcodeModule,
    LocalStorageModule.withConfig({ prefix: 'dncashio-demo', storageType: 'localStorage' }),
    // App:
    AppRoutes
  ],
  providers: [
    AuthHttp,
    CashApiService,
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
