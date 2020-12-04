import {Component, OnInit} from '@angular/core';
import {BiometricsService} from "../../services/biometrics.service";
import {TitleCasePipe} from "@angular/common";

@Component({
    selector: 'app-document-scanner',
    templateUrl: './document-scanner.component.html',
    styleUrls: ['./document-scanner.component.scss']
})
export class DocumentScannerComponent implements OnInit {

    biometricsUrl: string;
    biometricsApiKey: string;
    documentFrontPicture = null;
    documentBackPicture = null;
    verificationDniResults = null;
    verifying = false;
    verificationError = null;

    constructor(private biometrics: BiometricsService, public titleCasePipe: TitleCasePipe) {
    }

    ngOnInit(): void {
        this.biometricsUrl = this.biometrics.getServerUrl();
        this.biometricsApiKey = this.biometrics.getServerApiKey();
    }

    public onDniFrontCaptured(picture) {
        this.documentFrontPicture = picture;
    }

    public onDniBackCaptured(picture) {
        this.documentBackPicture = picture;
    }

    public async scanDocument() {
        if (!this.verifying) {
            this.verifying = true;
            this.verificationDniResults = null;
            this.verificationError = null;
            try {
                this.verificationDniResults = await this.biometrics.scanDocumentData(this.documentFrontPicture, this.documentBackPicture);
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
