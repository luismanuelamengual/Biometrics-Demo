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
    livenessPicture = null;
    livenessInstructionPictures = [];
    livenessSessionRunning = false;
    livenessInstructionsCount = 5;
    livenessTimeoutSeconds = 10;
    cameraFacingMode: 'environment' | 'user' = 'user';

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
        this.livenessInstructionPictures = [];
        const livenessReader = new FileReader();
        livenessReader.onloadend = () => {
            this.livenessPicture = livenessReader.result;
        };
        livenessReader.readAsDataURL(livenessData.picture);
        for (const picture of livenessData.instructionPictures) {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.livenessInstructionPictures.push(reader.result);
            };
            reader.readAsDataURL(picture);
        }
        this.livenessSessionRunning = false;
    }
}
