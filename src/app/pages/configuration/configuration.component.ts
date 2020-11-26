import {Component, OnInit} from '@angular/core';
import {BiometricsService} from '../../services/biometrics.service';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-configuration',
    templateUrl: './configuration.component.html',
    styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

    biometricsUrl: string;
    biometricsApiKey: string;

    constructor(private biometrics: BiometricsService) {
    }

    ngOnInit(): void {
        this.biometricsUrl = this.biometrics.getServerUrl();
        this.biometricsApiKey = this.biometrics.getServerApiKey();
    }

    isDataChanged() {
        return (this.biometricsUrl !== this.biometrics.getServerUrl() || this.biometricsApiKey !== this.biometrics.getServerApiKey());
    }

    resetChanges() {
        this.biometricsUrl = environment.biometricsUrl;
        this.biometricsApiKey = environment.biometricsApiKey;
        this.saveChanges();
    }

    saveChanges() {
        this.biometrics.setServerUrl(this.biometricsUrl);
        this.biometrics.setServerApiKey(this.biometricsApiKey);
        this.biometricsUrl = this.biometrics.getServerUrl();
        this.biometricsApiKey = this.biometrics.getServerApiKey();
    }
}
