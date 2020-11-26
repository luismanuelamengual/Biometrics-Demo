import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import ImageUtils from '../utils/image-utils';

@Injectable({
    providedIn: 'root'
})
export class BiometricsService {

    serverUrl: string;
    serverApiKey: string;

    constructor(private http: HttpClient) {
        this.serverUrl = localStorage.getItem('serverUrl');
        this.serverApiKey = localStorage.getItem('serverApiKey');
        if (!this.serverUrl) {
            this.serverUrl = environment.biometricsUrl;
        }
        if (!this.serverApiKey) {
            this.serverApiKey = environment.biometricsApiKey;
        }
    }

    public getServerUrl(): string {
        return this.serverUrl;
    }

    public setServerUrl(serverUrl) {
        serverUrl = serverUrl.trim();
        if (serverUrl.endsWith('/')) {
            serverUrl = serverUrl.substr(0, serverUrl.length - 1);
        }

        this.serverUrl = serverUrl;
        localStorage.setItem('serverUrl', serverUrl);
    }

    public getServerApiKey(): string {
        return this.serverApiKey;
    }

    public setServerApiKey(serverApiKey: string) {
        this.serverApiKey = serverApiKey;
        localStorage.setItem('serverApiKey', serverApiKey);
    }

    public verifyIdentify(selfie: string, documentFront: string, documentBack: string): Promise<any> {
        const selfieBytes = ImageUtils.convertImageToBlob(selfie);
        const documentFrontBytes = ImageUtils.convertImageToBlob(documentFront);
        const documentBackBytes = ImageUtils.convertImageToBlob(documentBack);
        const formData = new FormData();
        formData.append('selfie', selfieBytes);
        formData.append('documentFront', documentFrontBytes);
        formData.append('documentBack', documentBackBytes);
        return this.http.post( `${this.getServerUrl()}/v1/verify_identity`, formData, {headers: { Authorization: 'Bearer ' + this.getServerApiKey()}}).toPromise();
    }

    public scanDocumentData(documentFront: string, documentBack: string): Promise<any> {
        const documentFrontBytes = ImageUtils.convertImageToBlob(documentFront);
        const documentBackBytes = ImageUtils.convertImageToBlob(documentBack);
        const formDataDocument = new FormData();
        formDataDocument.append('documentFront', documentFrontBytes);
        formDataDocument.append('documentBack', documentBackBytes);
        return this.http.post(`${this.getServerUrl()}/v1/scan_document_data`, formDataDocument, {headers: { Authorization: 'Bearer ' + this.getServerApiKey()}}).toPromise();
    }
}
