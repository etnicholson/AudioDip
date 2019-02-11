import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UploadService {



  constructor(private http: HttpClient) {}


  public uploadImage(image: File) {
    const formData = new FormData();
    console.log(image);
    formData.append('audio', image);
    console.log(formData);
    return this.http.post('http://localhost:5000/api/file', formData);

}

}
