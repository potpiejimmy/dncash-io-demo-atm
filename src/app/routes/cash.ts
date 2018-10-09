import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CashApiService } from "../services/cashapi.service";
import { AppService } from "../services/app.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
    selector: 'cash',
    templateUrl: 'cash.html'
})
export class CashComponent implements OnInit {

    displayString: string;
    token: any;

    constructor(
        private router: Router,
        private cashApiService: CashApiService,
        public appService: AppService,
        public snackBar: MatSnackBar
    ) {}
    
    ngOnInit(): void {
        if (!this.appService.currentToken) {
            this.router.navigate(['/']);
            return;
        }
        this.token = this.appService.currentToken;
        this.displayString = this.token.amount/100 + " " + this.token.symbol + " (" + this.token.state + ")";
    }

    confirm(state: string) {
        this.cashApiService.confirmToken(this.appService.currentToken.uuid, state, this.appService.paymentAmountAsNumber).then(() => {
            this.router.navigate([this.appService.currentMode]);
        }).catch(err => {
            this.snackBar.open(err, null, {duration: 10000, verticalPosition: 'top'});
        });
    }
}
