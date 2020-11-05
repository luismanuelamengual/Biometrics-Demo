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
    livenessInstructionsCount = 5;
    livenessTimeoutSeconds = 5;

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

    public async onLivenessCompleted(livenessData) {
        this.livenessPictures = [];
        for (const picture of livenessData.pictures) {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.livenessPictures.push(reader.result);
            };
            reader.readAsDataURL(picture);
        }
        this.livenessSessionRunning = false;
    }
}
