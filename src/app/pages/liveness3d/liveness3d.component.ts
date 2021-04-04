import {Component} from '@angular/core';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-liveness3d',
    templateUrl: './liveness3d.component.html',
    styleUrls: ['./liveness3d.component.scss']
})
export class Liveness3dComponent {

    biometricsUrl: string;
    biometricsApiKey: string;
    livenessSessionRunning = false;
    livenessTimeoutSeconds = 10;
    livenessVerificationCompleted = false;
    livenessPicture = null;
    livenessVerified = false;
    livenessDebugData = null;

    constructor() {
        this.biometricsUrl = environment.biometricsUrl;
        this.biometricsApiKey = environment.biometricsApiKey;
    }

    public startLivenessSession() {
        this.livenessSessionRunning = true;
        this.livenessVerified = false;
        this.livenessPicture = null;
        this.livenessDebugData = null;
    }

    public stopLivenessSession() {
        this.livenessSessionRunning = false;
    }

    public async onLivenessCompleted(livenessData) {
        const livenessReader = new FileReader();
        livenessReader.onloadend = () => {
            this.livenessSessionRunning = false;
            this.livenessVerified = true;
            this.livenessPicture = livenessReader.result;
            this.livenessDebugData = livenessData.debugData;
            this.livenessVerificationCompleted = true;
        };
        livenessReader.readAsDataURL(livenessData.picture);
    }

    public async onLivenessFailed(livenessData) {
        this.livenessSessionRunning = false;
        this.livenessVerified = false;
        this.livenessDebugData = livenessData.debugData;
        this.livenessVerificationCompleted = true;
    }
}
