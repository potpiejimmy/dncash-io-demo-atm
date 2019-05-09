import { Component, OnInit, AfterViewInit, ViewChild, NgZone } from "@angular/core";
import { QrScannerComponent } from "angular2-qrscanner";
import { Router, ActivatedRoute } from "@angular/router";
import { CashApiService } from "../services/cashapi.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AppService } from "../services/app.service";

@Component({
    selector: 'scan',
    templateUrl: 'scan.html'
})
export class ScanComponent implements OnInit, AfterViewInit {

    @ViewChild(QrScannerComponent) qrScannerComponent: QrScannerComponent;

    result: string;

    constructor(
        private zone: NgZone,
        private route: ActivatedRoute,
        private router: Router,
        private cashApiService: CashApiService,
        private appService: AppService,
        public snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        // auto-setup if params passed:
        this.route.queryParams.subscribe(params => {
            if (params.key && params.secret) {
                this.appService.setup(params.key, params.secret);
            }
        });
    }

    ngAfterViewInit(): void {
        this.qrScannerComponent.startScanning(null);

        this.qrScannerComponent.capturedQr.subscribe(result => {
            this.zone.run(() => this.qrCodeScanned(result));
        });
    }

    qrCodeScanned(result: string) {
        console.log(result);
        this.result = result;

        this.cashApiService.verifyCode(result).then(token => {
            this.appService.currentToken = token;
            this.router.navigate(['/cash']);
        }).catch(err => {
            console.log(err);
            this.result = "Invalid code.";
        });
    }
}
