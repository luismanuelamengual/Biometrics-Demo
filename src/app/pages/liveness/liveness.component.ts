import {Component, OnInit} from '@angular/core';
import {BiometricsService} from '../../services/biometrics.service';

@Component({
    selector: 'app-liveness',
    templateUrl: './liveness.component.html',
    styleUrls: ['./liveness.component.scss']
})
export class LivenessComponent implements OnInit {

    biometricsUrl: string;
    biometricsApiKey: string;
    livenessPicture = null;
    livenessInstructionPictures = [];
    livenessSessionRunning = false;
    livenessInstructionsCount = 5;
    livenessInstructionTimeoutSeconds = 10;
    livenessTimeoutSeconds = 45;
    livenessMode: 'classic' | 'mask' = 'classic';
    cameraFacingMode: 'environment' | 'user' = 'user';

    constructor(private biometrics: BiometricsService) {
    }

    ngOnInit(): void {
        this.biometricsUrl = this.biometrics.getServerUrl();
        this.biometricsApiKey = this.biometrics.getServerApiKey();
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
