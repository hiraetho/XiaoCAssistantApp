import {Component, OnInit, ViewChild} from '@angular/core';
import {interval} from "rxjs";
import {IonContent, ToastController} from "@ionic/angular";

import Recorder from 'js-audio-recorder';
import {HttpService} from "../core/http.service";
import {map} from "rxjs/operators";

export interface itemConfig {
    text: string,
    inputFlag?: boolean,
}
@Component({
    selector: 'app-dtl',
    templateUrl: './dtl.page.html',
    styleUrls: ['./dtl.page.scss'],
})
export class DtlPage implements OnInit {

    @ViewChild('content', {static: false}) content: IonContent;

    recorder;

    allQuestionList = [
        {
            text: '我想查余额',
        },
        {
            text: '我想看客户动态',
        },
        {
            text: '海康的未来收支情况',
        },
        {
            text: '我想看异常报告',
        },
        {
            text: '最近新开户企业',
        },
        {
            text: '我想帮客户申请结售汇',
        },
        {
            text: '大华',
        },
        {
            text: '我想查法人背后企业',
        },
        {
            text: '我管护企业理财情况',
        },
        {
            text: '存款',
        },
        {
            text: '百度在我行的存款',
        },
        {
            text: '海康在我行的贷款',
        },
        {
            text: '我管护企业的到期业务',
        },
        {
            text: '招银网络科技到期业务',
        },
        {
            text: '到期业务',
        },
        {
            text: '我想查看KYC手册',
        },
        {
            text: '我要帮客户办理付款代理',
        },
        {
            text: '目前有那些商机',
        },
        {
            text: '阿里在我行的结构性存款情况',
        }
    ];
    topQuestionList = [];
    allList: any[] = [];

    constructor(
        private toastController: ToastController,
        private httpService: HttpService,
    ) {
        // this.allList = [
        //     {
        //         text: '随便说type0',
        //         inputFlag: true,
        //     },
        //     // type=0,没有命中，提示：小C还在努力学习，目前还不明白你说的什么，你可以按照下面的方式尝试询问。
        //     {
        //         type:0,
        //         text: '小C还在努力学习，目前还不明白你说的什么，你可以按照下面的方式尝试询问。',
        //         questionList: this.getRandomQuestionList()
        //     },
        //     // type=0,没有命中，提示：小C还在努力学习，目前还不明白你说的什么，你可以按照下面的方式尝试询问。
        //     {
        //         type:0,
        //         text: '小C还在努力学习，目前还不明白你说的什么，你可以按照下面的方式尝试询问。',
        //         questionList: this.getRandomQuestionList()
        //     },
        //     {
        //         text: '随便说type1',
        //         inputFlag: true,
        //     },
        //     // type=1,当命中多个功能或者只有一个非业务列表功能的时候返回功能列表和跳转地址
        //     {
        //         type:1,
        //         fct_list:
        //             [
        //                 {
        //                     fct_nm:"查产品",
        //                     fct_url:"跳转地址"
        //                 },
        //                 {
        //                     fct_nm:"查产品",
        //                     fct_url:"跳转地址"
        //                 }
        //             ]
        //     },
        //     {
        //         text: '随便说type2',
        //         inputFlag: true,
        //     },
        //     // type=2,当命中某个具体业务功能的时候返回业务功能包含的业务列表
        //     {
        //         type:2,
        //         bus_type: 'Business_expiration',
        //         bus_list:
        //             [
        //                 {
        //                     cust_nm:"百度",
        //                     due_time:"20191022",
        //                     money:"200.9",
        //                     bus_nm:"对公理财"
        //
        //                 },
        //                 {
        //                     cust_nm:"招银网络科技",
        //                     due_time:"20230422",
        //                     money:"898572",
        //                     bus_nm:"协定存款"
        //
        //                 }
        //             ]
        //     },
        //     {
        //         text: '随便说type3',
        //         inputFlag: true,
        //     },
        //     // type=3,当只有一个企业的时候
        //     {
        //         type:3,
        //         cust_nm:"百度",
        //         dps:"13023413",
        //         struct_dps:"7673",
        //         loan:"3426",
        //         financial:"7643"
        //     },
        //     {
        //         text: '随便说type4',
        //         inputFlag: true,
        //     },
        //     // type=4命中企业和指标
        //     {
        //         type:4,
        //         cust_nm:"百度",
        //         inf_nm:"一般性存款",
        //         dps:"13023413"
        //     },
        //     {
        //         text: '随便说type5',
        //         inputFlag: true,
        //     },
        //     // type=5命中企业和业务功能，返回业务列表
        //     {
        //         type:5,
        //         cust_nm:"招银网络科技",
        //         bus_nm:"业务到期",
        //         bus_type:"Business_expiration",
        //         bus_list:
        //             [
        //                 {
        //                     cust_nm:"招银网络科技",
        //                     due_time:"20230422",
        //                     money:"898572",
        //                     bus_nm:"协定存款"
        //                 },
        //                 {
        //                     cust_nm:"招银网络科技",
        //                     due_time:"20220518",
        //                     money:"123141414",
        //                     bus_nm:"定期存款"
        //                 }
        //
        //             ]
        //     }
        //
        // ];
        this.topQuestionList = this.getRandomQuestionList();
    }

    getRandomQuestionList() {
        let list = this.allQuestionList;
        let arr = [];
        let indexArr = [];
        for (let i = 0; arr.length < 5; i++) {
            const random = this.random(0, list.length);
            if (!indexArr.includes(random)) {
                arr.push(list[random]);
                indexArr.push(random);
            }
        }
        return arr;
    }

    // 产生随机整数，包含下限值，但不包括上限值
    random(lower, upper) {
        return Math.floor(Math.random() * (upper - lower)) + lower;
    }

    changeQuestionList() {
        this.topQuestionList = this.getRandomQuestionList();
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

    // 开始按压录音
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

    // 结束按压录音
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
        // setTimeout(() => {
        //     alert((this.recorder.getPCMBlob() as Blob).size);
        // })
        this.voiceToText();
    }

    // 语音转文字
    voiceToText() {
        // const url = 'http://99.15.213.130:8080/uploadVoice';
        // const url = 'http://99.15.214.183:8080/uploadVoice';
        const url = 'http://99.15.214.7:8080/uploadVoice';
        // const url = 'http://99.15.215.14:8080/url';
        // const params = {
        //     file: this.recorder.getPCMBlob()
        // }
        this.httpService.formRequest(url, this.recorder.getPCMBlob())
            .subscribe((text) => {
                // console.log('voiceToText', res);
                this.askQuestion(text);
            }, () => {
                this.askQuestion('网络问题，请稍后重试！');
            })
    }

    askQuestion(text) {
        if (text) {
            this.dealText(text);
        }
    }

    // 解析文字
    dealText(text) {
        // const url = 'http://99.15.213.130:8080/text';
        this.allList.push(
            {
                text,
                inputFlag: true,
            }
        );
        const url = 'http://99.15.214.183:8080/text';
        const params = {
            text
        }
        this.httpService.sendRequest(url, params)
            .pipe(
                map(res => {
                    if (res && res.rtn_cod === '0' && res.result) {
                        this.allList.push(res.result);
                    } else {
                        throw new Error('123');
                    }
                })
            )
            .subscribe((res) => {
                console.log('dealText', res);
                this.content.scrollToBottom().then((res) => {
                    console.log('res', res);
                }).catch(() => {

                })
            }, (err) => {
                console.log(err);
                this.allList.push(    {
                    type:0,
                    text: '小C还在努力学习，目前还不明白你说的什么，你可以按照下面的方式尝试询问。',
                    questionList: this.getRandomQuestionList()
                });
                this.content.scrollToBottom().then((res) => {
                    console.log('res', res);
                }).catch(() => {

                })
            })
    }
}
