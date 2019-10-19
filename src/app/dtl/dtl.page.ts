import {Component, OnInit, ViewChild} from '@angular/core';
import {interval} from "rxjs";
import {IonContent, ToastController} from "@ionic/angular";

import Recorder from 'js-audio-recorder';

export interface itemConfig {
    text: string,
    inputFlag?: boolean,
    // outputFlag?: boolean,
}
@Component({
    selector: 'app-dtl',
    templateUrl: './dtl.page.html',
    styleUrls: ['./dtl.page.scss'],
})
export class DtlPage implements OnInit {

    @ViewChild('content', {static: false}) content: IonContent;

    recorder;
    list: itemConfig[] = [
        {
            text: '蛇年大吉可是你看斯诺',
            inputFlag: true,
        },
        {
            text: '蛇年大吉可是你看斯诺蛇年大吉可是你看斯诺蛇年大吉可是你看斯诺蛇年大吉可是你看斯诺蛇年大吉可是你看斯诺',
            inputFlag: false,
        },
        {
            text: '蛇年大吉可是你看斯诺',
            inputFlag: false,
        },
        {
            text: '蛇年大吉可是你看斯诺',
            inputFlag: true,
        },
        {
            text: '蛇年大吉可是你看斯诺蛇年大吉可是你看斯诺蛇年大吉可是你看斯诺蛇年大吉可是你看斯诺蛇年大吉可是你看斯诺',
            inputFlag: false,
        },
        {
            text: '蛇年大吉可是你看斯诺',
            inputFlag: false,
        },
    ];

    constructor(
        private toastController: ToastController
    ) {
    }

    ngOnInit() {
        // interval(2000).subscribe(() => {
        //     const item = {
        //         text: '蛇年大吉可是你看斯诺蛇年大吉可是你看斯诺蛇年大吉可是你看斯诺蛇年大吉可是你看斯诺蛇年大吉可是你看斯诺',
        //         inputFlag: false,
        //     };
        //     this.list.push(item);
        //     this.content.scrollToBottom().then((res) => {
        //         console.log('res', res);
        //     }).catch(() => {
        //
        //     })
        // })
    }

    async onPress($event) {
        console.log("onPress11", $event);
        const toast = await this.toastController.create({
            message: '开始录音',
            duration: 1000,
            position: "top",
        });
        toast.present();
        this.recorder = new Recorder({
            sampleBits: 16,         // 采样位数，支持 8 或 16，默认是16
            sampleRate: 16000,      // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
            numChannels: 1,         // 声道，支持 1 或 2， 默认是1
        });
        this.recorder.start().then(() => {
            // 开始录音
            console.log('开始录音');
        }, (error) => {
            // 出错了
            console.log('开始录音异常！');
            console.log(`${error.name} : ${error.message}`);
        });
    }

    async onPressUp($event) {
        console.log("onPressUp22", $event);
        const toast = await this.toastController.create({
            message: '结束录音',
            duration: 1000,
            position: "top",
        });
        toast.present();
        this.recorder.stop();
        // 获取 PCM 数据(Blob)
        console.log('this.recorder.getPCMBlob();', this.recorder.getPCMBlob());
        setTimeout(() => {
            // alert((this.recorder.getPCMBlob() as Blob).size);
        })
    }
}
