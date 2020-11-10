import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import ImageUtils from 'src/app/utils/image-utils';

@Component({
    selector: 'app-dni-picture-getter',
    templateUrl: './dni-picture-getter.component.html',
    styleUrls: ['./dni-picture-getter.component.scss']
})
export class DniPictureGetterComponent implements AfterViewInit {

    @ViewChild ('canvas', {static: false})
    public canvas: ElementRef;

    @ViewChild('captureInput')
    public captureInput: ElementRef;

    @Output()
    dniCaptured = new EventEmitter();

    pictureCaptureSupported: boolean;
    pictureUrl = null;
    cameraOpen = false;

    @Input()
    maxPictureWidth = 1280;

    @Input()
    maxPictureHeight = 720;

    constructor() {
        const el: any = document.createElement('input');
        this.pictureCaptureSupported = el.capture !== undefined;
    }

    public ngAfterViewInit() {
        this.reset();
    }

    public onPictureCaptured(picture) {
        this.setPicture(picture);
        this.cameraOpen = false;
    }

    public onNativePictureCaptured(picture) {
        const img = new Image();
        img.onload = () => {
            const imageWidth = img.width;
            const imageHeight = img.height;
            const scale = Math.min((this.maxPictureWidth / imageWidth), (this.maxPictureHeight / imageHeight));
            const iwScaled = imageWidth * scale;
            const ihScaled = imageHeight * scale;
            this.canvas.nativeElement.width = iwScaled;
            this.canvas.nativeElement.height = ihScaled;
            const context = this.canvas.nativeElement.getContext('2d');
            context.drawImage(img, 0, 0, iwScaled, ihScaled);
            this.setPicture(this.canvas.nativeElement.toDataURL('image/jpeg'));
        };
        try {
            const reader = new FileReader();
            reader.onload = (e) => {
                img.src = e.target.result as string;
            };
            reader.onerror = (e) => {
                img.src = URL.createObjectURL(picture);
            };
            reader.readAsDataURL(picture);
        } catch (e) {
            img.src = URL.createObjectURL(picture);
        }
    }

    public rotateImage(degrees = 90) {
        if (this.pictureUrl) {
            ImageUtils.rotateImage(this.pictureUrl, degrees).then((newPictureUrl) => this.setPicture(newPictureUrl));
        }
    }

    public setPicture(pictureUrl) {
        this.pictureUrl = pictureUrl;
        this.dniCaptured.emit(this.pictureUrl);
    }

    public reset() {
        this.pictureUrl = null;
    }

    openCamera() {
        if (this.pictureCaptureSupported) {
            this.captureInput.nativeElement.click();
        } else {
            this.cameraOpen = true;
        }
    }
}
