import { Component } from "@angular/core";
import { CashApiService } from "../services/cashapi.service";
import { AppService } from "../services/app.service";
import { Router } from "@angular/router";

@Component({
    selector: 'legacy',
    templateUrl: 'legacy.html'
})
export class LegacyComponent {

    TRIGGER_TIMEOUT = 120;

    processing: boolean;
    triggercode: string;
    timeout: number;

    constructor(
        private cashApiService: CashApiService,
        private appService: AppService,
        private router: Router
    ) {
    }

    start() {
        this.processing = true;
        this.appService.currentMode = '/legacy';

        this.cashApiService.createTrigger(this.TRIGGER_TIMEOUT).then(res => {
            this.triggercode = res.triggercode;
            this.request();
        })
    }

    handleTimeout() {
        if (!this.processing) return;
        this.timeout--;
        if (this.timeout <= 0) this.processing = false;
        else setTimeout(()=>this.handleTimeout(), 1000);
    }

    startTimeout(timeout) {
        this.timeout = timeout;
        this.handleTimeout();
    }

    request() {
        this.startTimeout(this.TRIGGER_TIMEOUT);
        this.cashApiService.requestTrigger(this.triggercode).then(token => {
            this.tokenReceived(token);
        }).catch(err => {
        })
    }

    tokenReceived(token: any) {
        this.processing = false;
        this.appService.currentToken = token;
        this.router.navigate(['/cash']);
    }
}
