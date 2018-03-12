import { Component, OnInit, AfterViewInit, ViewChild, NgZone } from "@angular/core";
import { QrScannerComponent } from "angular2-qrscanner";
import { Router, ActivatedRoute } from "@angular/router";
import { LocalStorageService } from "angular-2-local-storage";
import { CashApiService } from "../services/cashapi.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
    selector: 'scan',
    templateUrl: 'scan.html'
  })
  export class ScanComponent implements OnInit, AfterViewInit {

    @ViewChild(QrScannerComponent) qrScannerComponent: QrScannerComponent;

    result: string;
    token: any;

    constructor(
        private zone: NgZone,
        private route: ActivatedRoute,
        private localStorageService: LocalStorageService,
        private cashApiService: CashApiService,
        public snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        // auto-setup if params passed:
        this.route.queryParams.subscribe(params => {
            if (params.key && params.secret) {
                this.setup(params.key, params.secret);
            }
        })
    }

    setup(apikey, apisecret) {
        let oldApiKey = this.localStorageService.get("DN-API-KEY");
        let oldApiSecret = this.localStorageService.get("DN-API-SECRET");

        if (apikey != oldApiKey || apisecret != oldApiSecret) {
            // new api credentials, (re-)register device:
            this.localStorageService.set("DN-API-KEY", apikey);
            this.localStorageService.set("DN-API-SECRET", apisecret);
            this.registerDevice();
        }
    }

    registerDevice() {
        this.cashApiService.registerDevice().then(res => {
            console.log("Registration Result: " + JSON.stringify(res));
            this.snackBar.open("Registered ATM: " + res.uuid, null, {duration: 3000, verticalPosition: 'top'});
            this.localStorageService.set('device-uuid', res.uuid);
        }).catch(err => {
            console.log("Registration failed: " + err);
            this.snackBar.open(err, null, {duration: 5000, verticalPosition: 'top'});
        });
    }

    ngAfterViewInit(): void {
        this.qrScannerComponent.getMediaDevices().then(devices => {
            console.log(devices);
            const videoDevices: MediaDeviceInfo[] = [];
            for (const device of devices) {
                if (device.kind.toString() === 'videoinput') {
                    videoDevices.push(device);
                }
            }
            if (videoDevices.length > 0){
                let choosenDev = videoDevices[0];
                for (const dev of videoDevices){
                    if (dev.label.includes('front')){
                        choosenDev = dev;
                        break;
                    }
                }
                this.qrScannerComponent.chooseCamera.next(choosenDev);
            }
        });

        this.qrScannerComponent.capturedQr.subscribe(result => {
            this.zone.run(() => this.qrCodeScanned(result));
        });
    }

    qrCodeScanned(result: string) {
        console.log(result);
        this.result = result;

        this.cashApiService.verifyCode(result).then(token => {
            this.token = token;
            this.result = token.amount/100 + " " + token.symbol + " (" + token.state + ")";
        }).catch(err => {
            console.log(err);
            this.result = "Invalid code.";
        });
    }

    confirm(state: string) {
        this.cashApiService.confirmToken(this.token.uuid, state).then(() => {
            window.location.reload();
        });
    }
}
