import {Component} from '@angular/core';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-liveness',
    templateUrl: './liveness.component.html',
    styleUrls: ['./liveness.component.scss']
})
export class LivenessComponent {

    biometricsUrl: string;
    biometricsApiKey: string;
    livenessPictures = [];
    livenessSessionRunning = false;
    livenessInstructionsCount = '5';

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
        this.livenessPictures = livenessData.pictures;
        this.livenessSessionRunning = false;
    }
}
