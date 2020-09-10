import {Component} from '@angular/core';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-passive-liveness',
    templateUrl: './passive_liveness.component.html',
    styleUrls: ['./passive_liveness.component.scss']
})
export class PassiveLivenessComponent {

    biometricsUrl: string;
    biometricsApiKey: string;
    livenessSessionRunning = false;
    livenessTimeoutSeconds = 10;
    livenessVerificationCompleted = false;
    livenessPicture = null;
    livenessVerified = false;

    constructor() {
        this.biometricsUrl = environment.biometricsUrl;
        this.biometricsApiKey = environment.biometricsApiKey;
    }

    public startLivenessSession() {
        this.livenessSessionRunning = true;
    }

    public stopLivenessSession() {
        this.livenessSessionRunning = false;
    }

    public onLivenessCompleted(livenessData) {
        this.livenessSessionRunning = false;
        this.livenessVerificationCompleted = true;
        this.livenessPicture = livenessData.picture;
        this.livenessVerified = livenessData.livenessVerified;
    }
}
