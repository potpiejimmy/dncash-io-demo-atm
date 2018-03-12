import { Component, OnInit } from "@angular/core";
import { CashApiService } from "../services/cashapi.service";
import { AppService } from "../services/app.service";
import { Router } from "@angular/router";

@Component({
    selector: 'noscan',
    templateUrl: 'noscan.html'
})
export class NoScanComponent implements OnInit {

    processing: boolean;
    triggercode: string;
    timeout: number;

    constructor(
        private cashApiService: CashApiService,
        private appService: AppService,
        private router: Router
     ) {
     }

    ngOnInit(): void {
    }

    start() {
        this.processing = true;
        this.appService.currentMode = '/noscan';

        this.cashApiService.createTrigger().then(res => {
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
        this.startTimeout(60);
        this.cashApiService.requestTrigger(this.triggercode).then(token => {
            this.processing = false;
            this.appService.currentToken = token;
            this.router.navigate(['/cash']);
        }).catch(err => {
        })
    }
}
