import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import ImageUtils from '../utils/image-utils';

@Injectable({
    providedIn: 'root'
})
export class BiometricsService {

    constructor(private http: HttpClient) {
    }

    public verifyIdentify(selfie: string, documentFront: string, documentBack: string): Promise<any> {
        const selfieBytes = ImageUtils.convertImageToBlob(selfie);
        const documentFrontBytes = ImageUtils.convertImageToBlob(documentFront);
        const documentBackBytes = ImageUtils.convertImageToBlob(documentBack);
        const formData = new FormData();
        formData.append('selfie', selfieBytes);
        formData.append('documentFront', documentFrontBytes);
        formData.append('documentBack', documentBackBytes);
        return this.http.post( `${environment.biometricsUrl}/v1/verify_identity`, formData, {headers: { Authorization: 'Bearer ' + environment.biometricsApiKey}}).toPromise();
    }

    public scanDocumentData(documentFront: string, documentBack: string): Promise<any> {
        const documentFrontBytes = ImageUtils.convertImageToBlob(documentFront);
        const documentBackBytes = ImageUtils.convertImageToBlob(documentBack);
        const formDataDocument = new FormData();
        formDataDocument.append('documentFront', documentFrontBytes);
        formDataDocument.append('documentBack', documentBackBytes);
        return this.http.post(`${environment.biometricsUrl}/v1/scan_document_data`, formDataDocument, {headers: { Authorization: 'Bearer ' + environment.biometricsApiKey}}).toPromise();
    }
}
