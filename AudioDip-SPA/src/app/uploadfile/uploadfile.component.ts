import { Component, OnInit, ViewChild } from '@angular/core';
import { UploadService } from '../_services/upload.service';
import { HttpClient, HttpRequest, HttpEvent, HttpEventType } from '@angular/common/http';
import { map, tap, last, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/user';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}


@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.css']
})
export class UploadfileComponent implements OnInit {


  baseUrl = environment.apiUrl + 'file/';
  selectedFile: File = null;
  @ViewChild('imageInput') fs: any;
  @ViewChild('f') title: NgForm;
  val: number;
  user: User;


  constructor(private imageService: UploadService, private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.val = 0;

  }

  processFile(event) {

    this.selectedFile = event.target.files[0];
    const fd = new FormData();
    const user = localStorage.getItem('user');
    const id = JSON.parse(user);


    fd.append('audio', this.selectedFile, this.selectedFile.name);
    fd.append('filename', this.title.value.Title);
    fd.append('id', id['id'] );

    this.upload(fd);



  }


  upload(f) {
    this.http.post(this.baseUrl, f, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.val = Math.round(event.loaded / event.total * 100);
          if (event.loaded === event.total ) {
            console.log(event);
            this.title.reset();
            this.fs.nativeElement.value = '';

          }
        }

      });

  }


  /** Return distinct message for sent, upload progress, & response events */

}




