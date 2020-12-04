import {Component, OnInit} from '@angular/core';
import {BiometricsService} from '../../services/biometrics.service';

@Component({
    selector: 'app-identification',
    templateUrl: './identification.component.html',
    styleUrls: ['./identification.component.scss']
})
export class IdentificationComponent implements OnInit {

    biometricsUrl: string;
    biometricsApiKey: string;
    documentFrontPicture = null;
    documentBackPicture = null;
    livenessPicture = null;
    livenessSessionRunning = false;
    verificationResults = null;
    verificationDniResults = null;
    verificationError = null;
    verifying = false;
    livenessType: 'passive' | 'active' = 'active';

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

    public onDniFrontCaptured(picture) {
        this.documentFrontPicture = picture;
    }

    public onDniBackCaptured(picture) {
        this.documentBackPicture = picture;
    }

    public onLivenessCompleted(livenessData) {
        const reader = new FileReader();
        reader.onloadend = () => {
            this.livenessPicture = reader.result;
        };
        reader.readAsDataURL(livenessData.picture);
        this.livenessSessionRunning = false;
    }

    public onPassiveLivenessCompleted(livenessData) {
        if (livenessData.livenessVerified) {
            this.livenessPicture = livenessData.picture;
            this.livenessSessionRunning = false;
        }
    }

    public async verify() {
        if (!this.verifying) {
            this.verifying = true;
            this.verificationResults = null;
            this.verificationDniResults = null;
            this.verificationError = null;
            try {
                this.verificationResults = await this.biometrics.verifyIdentify(this.livenessPicture, this.documentFrontPicture, this.documentBackPicture);
                try {
                    this.verificationDniResults = await this.biometrics.scanDocumentData(this.documentFrontPicture, this.documentBackPicture);
                } catch (e) {}
            } catch (e) {
                this.verificationError = e.message;
            }
            this.verifying = false;
        }
    }

    public formatDocumentItemKey(documentItem: {key: string, value: any}) {
        const capRe = /[A-Z]/;
        const output = [];
        for (let i = 0, l = documentItem.key.length; i < l; i += 1) {
            if (i === 0) {
                output.push(documentItem.key[i].toUpperCase());
            }
            else {
                if (i > 0 && capRe.test(documentItem.key[i])) {
                    output.push(' ');
                }
                output.push(documentItem.key[i]);
            }
        }
        return output.join('');
    }

    public formatDocumentItem(documentItem: {key: string, value: any}) {
        let result = documentItem.value;
        if (documentItem.key === 'birthDate' || documentItem.key === 'expirationDate') {
            result = (new Date(documentItem.value)).toISOString().split('T')[0];
        }
        return result;
    }
}
