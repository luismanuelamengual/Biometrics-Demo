import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import ImageUtils from 'src/app/utils/image-utils';
import {environment} from '../../../environments/environment';
import {TitleCasePipe} from '@angular/common';

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
    livenessPictures = [];
    livenessSessionRunning = false;
    verificationResults = null;
    verificationDniResults = null;
    verificationError = null;
    verifying = false;

    constructor(private http: HttpClient, public titleCasePipe: TitleCasePipe) {
        this.biometricsUrl = environment.biometricsUrl;
        this.biometricsApiKey = environment.biometricsApiKey;
    }

    public startLivenessSession() {
        this.livenessSessionRunning = true;
    }

    public onDniFrontCaptured(picture) {
        this.documentFrontPicture = picture;
    }

    public onDniBackCaptured(picture) {
        this.documentBackPicture = picture;
    }

    public onLivenessCompleted(livenessData) {
        this.livenessPictures = livenessData.pictures;
        this.livenessSessionRunning = false;
    }

    public async verify() {
        if (!this.verifying) {
            this.verifying = true;
            this.verificationResults = null;
            this.verificationDniResults = null;
            this.verificationError = null;
            try {
                const selfieBytes = ImageUtils.convertImageToBlob(this.livenessPictures[0]);
                const documentFrontBytes = ImageUtils.convertImageToBlob(this.documentFrontPicture);
                const documentBackBytes = ImageUtils.convertImageToBlob(this.documentBackPicture);

                const formData = new FormData();
                formData.append('selfie', selfieBytes);
                formData.append('documentFront', documentFrontBytes);
                formData.append('documentBack', documentBackBytes);
                this.verificationResults = await this.http.post( `${environment.biometricsUrl}/v1/verify_identity`, formData, {headers: { Authorization: 'Bearer ' + environment.biometricsApiKey}}).toPromise();

                const formDataDocument = new FormData();
                formDataDocument.append('documentFront', documentFrontBytes);
                formDataDocument.append('documentBack', documentBackBytes);
                this.verificationDniResults = await this.http.post(`${environment.biometricsUrl}v1/scan_document_data`, formDataDocument, {headers: { Authorization: 'Bearer ' + environment.biometricsApiKey}}).toPromise();

            } catch (e) {
                this.verificationError = e.message;
            }
            this.verifying = false;
        }
    }
}
