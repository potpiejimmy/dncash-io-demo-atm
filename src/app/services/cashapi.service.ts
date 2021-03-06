import { Injectable } from "@angular/core";
import { AuthHttp } from "./authhttp.service";

import { environment } from "../../environments/environment";
import { LocalStorageService } from "angular-2-local-storage";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class CashApiService extends AuthHttp {

    constructor(
        private httpClient: HttpClient,
        private localStorage: LocalStorageService) {
        super(httpClient, localStorage);
    }

    registerDevice(): Promise<any> {
        return this.post(environment.apiUrl+"devices", {
            refname: navigator.userAgent.substr(0,36)
        });
    }

    verifyCode(radiocode: string): Promise<any> {
        return this.get(environment.apiUrl+"tokens/"+radiocode+"?device_uuid=" + this.localStorage.get("device-uuid"));
    }
    
    confirmToken(uid: string, state: string, amount: number): Promise<any> {
        return this.put(environment.apiUrl+"tokens/"+uid+"?device_uuid=" + this.localStorage.get("device-uuid"), {
            state: state,
            amount: amount
        });
    }

    createTrigger(expiresIn: number): Promise<any> {
        return this.post(environment.apiUrl+"trigger?device_uuid=" + this.localStorage.get("device-uuid") + "&expiresIn=" + expiresIn, {});
    }

    requestTrigger(triggercode: string): Promise<any> {
        return this.get(environment.apiUrl+"trigger/"+triggercode);
    }
}
