import {AfterViewInit, Component, EventEmitter, Output, ViewChild} from '@angular/core';
import ImageUtils from 'src/app/utils/image-utils';

@Component({
    selector: 'app-picture-getter',
    templateUrl: './picture-getter.component.html',
    styleUrls: ['./picture-getter.component.scss']
})
export class PictureGetterComponent implements AfterViewInit {

    @Output()
    pictureCaptured = new EventEmitter();

    pictureUrl = null;

    public ngAfterViewInit() {
        this.reset();
    }

    public onPictureCaptured(picture) {
        this.setPicture(picture);
    }

    public rotateImage(degrees = 90) {
        if (this.pictureUrl) {
            ImageUtils.rotateImage(this.pictureUrl, degrees).then((newPictureUrl) => this.setPicture(newPictureUrl));
        }
    }

    public setPicture(pictureUrl) {
        this.pictureUrl = pictureUrl;
        this.pictureCaptured.emit(this.pictureUrl);
    }

    public reset() {
        this.pictureUrl = null;
    }
}
