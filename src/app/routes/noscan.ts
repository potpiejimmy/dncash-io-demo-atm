import { Component, OnInit } from "@angular/core";
import { CashApiService } from "../services/cashapi.service";
import { AppService } from "../services/app.service";
import { Router, ActivatedRoute } from "@angular/router";
import { environment } from "../../environments/environment";
import * as mqtt from 'mqtt';

@Component({
    selector: 'noscan',
    templateUrl: 'noscan.html'
})
export class NoScanComponent implements OnInit {

    TRIGGER_TIMEOUT = 120;

    processing: boolean;
    triggercode: string;
    timeout: number;

    nfctrigger: string;

    constructor(
        private cashApiService: CashApiService,
        private appService: AppService,
        private route: ActivatedRoute,
        private router: Router
     ) {
     }

    ngOnInit(): void {
        // auto-setup if params passed:
        this.route.queryParams.subscribe(params => {
            if (params.key && params.secret) {
                this.appService.setup(params.key, params.secret).then(()=>this.createNFCTrigger());
            } else {
                this.createNFCTrigger();
            }
        });

    }

    createNFCTrigger() {
        this.cashApiService.createTrigger(86400).then(res => {
            let c = mqtt.connect(environment.mqttUrl, {username:"dncashio", password:"dncashio"});
            c.on('connect', () => {
                console.log("MQTT connected");
                this.nfctrigger = res.triggercode;
                c.subscribe('dncash-io/trigger/v1/' + res.triggercode);
            });
            c.on('message', (topic, message) => {
                console.log(message.toString());
                this.appService.currentMode = '/noscan';
                let msg = JSON.parse(message.toString());
                let data = msg.data;  // string
                let signature = msg.signature;  // Base64, signature of data
                // TODO: verify signature here
                this.tokenReceived(JSON.parse(data).token);
            });
            c.on('error', err => {
                console.log("MQTT not ready: " + err);
            });
        })
    }

    start() {
        this.processing = true;
        this.appService.currentMode = '/noscan';

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
