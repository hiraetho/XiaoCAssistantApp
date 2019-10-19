import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
      private httpClient: HttpClient,
  ) { }

  sendRequest(url: string, params): Observable<any> {
      // let headers = new HttpHeaders();
      // headers.set('Content-Type', 'application/json');
      // let headers = new HttpHeaders({
      //     'Content-Type': 'application/json'
      // });
      const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      return this.httpClient.post(url, params, httpOptions)
          .pipe(
              map((response: any) => {
                  console.log('1111111111response', response);
                  return response;
              })
          );
  }

    formRequest(url: string, params): Observable<any> {
        // let headers = new HttpHeaders();
        // headers.set('Content-Type', 'application/json');
        // let headers = new HttpHeaders({
        //     'Content-Type': 'application/json'
        // });
        let formData = new FormData();
        formData.set('file', params);
        // const httpOptions = {
        //     headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
        //     // headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        //     // headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data;boundary=YourBoundaryOfChoiceHere' })
        //     // headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data;boundary=YourBoundaryOfChoiceHere' })
        //     // headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-unlencoded' })
        // };
        return this.httpClient.post(url, formData, {})
            .pipe(
                map((response: any) => {
                    console.log('1111111111response', response);
                    if (response && response.rtn_cod === '200' && response.result && response.result.text) {
                        return response.result.text;
                    } else {
                        throw new Error('');
                    }
                })
            );
    }
}
