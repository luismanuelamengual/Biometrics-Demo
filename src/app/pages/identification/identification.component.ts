import {Component} from '@angular/core';
import ImageUtils from 'src/app/utils/image-utils';
import {environment} from '../../../environments/environment';
import {TitleCasePipe} from '@angular/common';
import {BiometricsService} from '../../services/biometrics.service';

@Component({
    selector: 'app-identification',
    templateUrl: './identification.component.html',
    styleUrls: ['./identification.component.scss']
})
export class IdentificationComponent {

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
    livenessType: 'passive' | 'active' = 'passive';

    constructor(private biometrics: BiometricsService, public titleCasePipe: TitleCasePipe) {
        this.biometricsUrl = environment.biometricsUrl;
        this.biometricsApiKey = environment.biometricsApiKey;
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
        this.livenessPicture = livenessData.pictures[0];
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

    public formatDocumentItem(documentItem: {key: string, value: any}) {
        let result = documentItem.value;
        if (documentItem.key === 'birthDate' || documentItem.key === 'expirationDate') {
            result = (new Date(documentItem.value)).toISOString().split('T')[0];
        }
        return result;
    }
}
