import { Injectable } from "@angular/core";

@Injectable()
export class AppService {
    currentToken;
    currentMode = '/';
    paymentAmount: string;

    get paymentAmountAsNumber(): number {
        if (!this.paymentAmount) return;
        return Math.round(Number.parseFloat(this.paymentAmount)*100);
    }
}
