import { Component, OnInit } from "@angular/core";
import { CashApiService } from "../services/cashapi.service";
import { AppService } from "../services/app.service";
import { Router, ActivatedRoute } from "@angular/router";
import { environment } from "../../environments/environment";
import * as mqtt from 'mqtt';

@Component({
    selector: 'nfc',
    templateUrl: 'nfc.html'
})
export class NFCComponent implements OnInit {

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
                this.appService.currentMode = '/nfc';
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

    tokenReceived(token: any) {
        this.appService.currentToken = token;
        this.router.navigate(['/cash']);
    }
}
