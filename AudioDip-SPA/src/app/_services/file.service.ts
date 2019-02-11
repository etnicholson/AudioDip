import { Injectable } from '@angular/core';
import { AudioFile } from '../_models/audioFile';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';


import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {



  baseUrl = environment.apiUrl + 'file/';
  audioFiles: AudioFile[];
  httpOptions: any;
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
   }

   getUserFiles(userId) {
    return this.http.get(this.baseUrl + 'userfiles/' + userId, this.httpOptions).pipe(
      map(res =>  res));

    }

    getAudio(id) {
      return this.http.get(this.baseUrl + 'getaudio/' + id).pipe(
        map(res =>  res));
      }

    deleteFile(id) {
      return this.http.delete(this.baseUrl + 'delete/'  + id, this.httpOptions).pipe(
        map(res =>  'file deleted'));

    }


}
