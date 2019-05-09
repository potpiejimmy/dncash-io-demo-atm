import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

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
import { LegacyComponent } from './routes/legacy';
import { NFCComponent } from './routes/nfc';
import { CashComponent } from './routes/cash';
import { AppService } from './services/app.service';

@NgModule({
  declarations: [
    AppComponent,
    // App:
    ScanComponent,
    LegacyComponent,
    NFCComponent,
    CashComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    // Angular Material:
    MatToolbarModule,
    MatSnackBarModule,
    MatButtonModule,
    MatInputModule,
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
