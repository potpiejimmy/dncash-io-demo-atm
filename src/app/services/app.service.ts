import { Injectable } from "@angular/core";
import { LocalStorageService } from "angular-2-local-storage";
import { CashApiService } from "./cashapi.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AppService {
    currentToken;
    currentMode = '/';
    paymentAmount: string;

    constructor(
        private localStorageService: LocalStorageService,
        private cashApiService: CashApiService,
        public snackBar: MatSnackBar
    ) {}

    get paymentAmountAsNumber(): number {
        if (!this.paymentAmount) return;
        return Math.round(Number.parseFloat(this.paymentAmount)*100);
    }

    setup(apikey, apisecret): Promise<any> {
        let oldApiKey = this.localStorageService.get("DN-API-KEY");
        let oldApiSecret = this.localStorageService.get("DN-API-SECRET");

        if (apikey != oldApiKey || apisecret != oldApiSecret) {
            // new api credentials, (re-)register device:
            this.localStorageService.set("DN-API-KEY", apikey);
            this.localStorageService.set("DN-API-SECRET", apisecret);
            return this.registerDevice();
        } else {
            return Promise.resolve();
        }
    }

    registerDevice(): Promise<any> {
        return this.cashApiService.registerDevice().then(res => {
            console.log("Registration Result: " + JSON.stringify(res));
            this.snackBar.open("Registered ATM: " + res.uuid, null, {duration: 3000, verticalPosition: 'top'});
            this.localStorageService.set('device-uuid', res.uuid);
        }).catch(err => {
            console.log("Registration failed: " + err);
            this.snackBar.open(err, null, {duration: 5000, verticalPosition: 'top'});
        });
    }
}
