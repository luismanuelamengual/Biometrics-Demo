import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import ImageUtils from 'src/app/utils/image-utils';
import {environment} from '../../../environments/environment';

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
    verificationError = null;
    verifying = false;

    constructor(private http: HttpClient) {
        this.biometricsUrl = environment.biometricsUrl;
        this.biometricsApiKey = environment.biometricsApiKey;
    }

    public startLivenessSession() {
        this.livenessSessionRunning = true;
    }

    public onDniFrontCaptured(picture) {
        console.log(picture);
        this.documentFrontPicture = picture;
    }

    public onDniBackCaptured(picture) {
        this.documentBackPicture = picture;
    }

    public onLivenessCompleted(livenessData) {
        this.livenessPictures = livenessData.pictures;
    }

    public async verify() {
        if (!this.verifying) {
            this.verifying = true;
            this.verificationResults = null;
            this.verificationError = null;
            const selfieBytes = ImageUtils.convertImageToBlob(this.livenessPictures[0]);
            const documentFrontBytes = ImageUtils.convertImageToBlob(this.documentFrontPicture);
            const documentBackBytes = ImageUtils.convertImageToBlob(this.documentBackPicture);
            const formData = new FormData();
            formData.append('selfie', selfieBytes);
            formData.append('documentFront', documentFrontBytes);
            formData.append('documentBack', documentBackBytes);
            try {
                const verificationResults: any = await this.http.post('/biometrics/v1/verify_identity', formData).toPromise();
                if (verificationResults.success && verificationResults.data.match) {
                    this.verificationResults = { match: verificationResults.data.match, similarity: verificationResults.data.similarity };
                    try {
                        const formDataDocument = new FormData();
                        formDataDocument.append('documentFront', documentFrontBytes);
                        formDataDocument.append('documentBack', documentBackBytes);
                        const documentResults: any = await this.http.post('/biometrics/v1/scan_document_data', formDataDocument).toPromise();
                        if (documentResults.success && documentResults.data.information) {
                            this.verificationResults.documentData = documentResults.data.information;
                        }
                    } catch (e) {}
                } else {
                    this.verificationResults = { match: false };
                }
            } catch (e) {
                this.verificationResults = { match: false };
            }
            this.verifying = false;
        }
    }
}
