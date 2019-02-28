import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

import { Attachment } from '../../../../services/models/mastodon.interfaces';
import { NavigationService } from '../../../../services/navigation.service';
import { OpenMediaEvent } from '../../../../models/common.model';
import { faPlay, faPause, faExpand, faVolumeUp, faVolumeMute } from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: 'app-attachements',
    templateUrl: './attachements.component.html',
    styleUrls: ['./attachements.component.scss']
})
export class AttachementsComponent implements OnInit {
    private _attachments: Attachment[];
    isImage: boolean;
    isGifv: boolean;
    isVideo: boolean;

    faPlay = faPlay;
    faPause = faPause;
    faExpand = faExpand;
    faVolumeUp = faVolumeUp;
    faVolumeMute = faVolumeMute;

    isPlaying: boolean = false;
    isMuted: boolean = false;

    // imageUrls: string[];

    @Input('attachments')
    set attachments(value: Attachment[]) {
        this._attachments = value;

        if (this._attachments[0].type === 'image') {
            this.isImage = true;
        } else if (this._attachments[0].type === 'gifv') {
            this.isGifv = true;
        } else if (this._attachments[0].type === 'video') {
            this.isVideo = true;
        }
    }
    get attachments(): Attachment[] {
        return this._attachments;
    }

    @ViewChild('videoPlayer') videoplayer: ElementRef;

    constructor(private readonly navigationService: NavigationService) { }

    ngOnInit() {
    }

    attachmentSelected(index: number): boolean {
        let openMediaEvent = new OpenMediaEvent(index, this.attachments);
        this.navigationService.openMedia(openMediaEvent);
        return false;
    }

    private getVideo(): HTMLVideoElement {
        return this.videoplayer.nativeElement;
    }

    onPlay() {
        if (!this.isPlaying) {
            this.getVideo().play();
        } else {
            this.getVideo().pause();
        }

        this.isPlaying = !this.isPlaying;

    }

    onExpand() {
        if (!this.isMuted) {
            this.onMute();
        }

        if (this.isPlaying) {
            this.onPlay();
        }

        this.attachmentSelected(0);
    }

    onMute() {        
        this.isMuted = !this.isMuted;
        this.getVideo().muted = this.isMuted;
    }
}
