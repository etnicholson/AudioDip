import { Component, OnInit } from '@angular/core';
import { AudioFile } from '../_models/audioFile';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FileService } from '../_services/file.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-userpanel',
  templateUrl: './userpanel.component.html',
  styleUrls: ['./userpanel.component.css']
})
export class UserpanelComponent implements OnInit {

  baseUrl = environment.apiUrl + 'file/';
  audioFiles: AudioFile[];
  hasFile: boolean;
  constructor(private fileService: FileService, private alertify: AlertifyService, private router: Router) { }



  ngOnInit() {
    const user = localStorage.getItem('user');
    const id = JSON.parse(user);

    this.fileService.getUserFiles(id['id']).subscribe(
      (res: any) => this.audioFiles = res
    , (error: any) => console.log(error) , () => {
          if (this.audioFiles.length < 1) {
            this.hasFile = false;
          } else {
            this.hasFile = true;
          }
            }

    );





  }


  delete(id: number) {

    this.fileService.deleteFile(id).subscribe(
      (res: any) => {
        this.alertify.warning('File Deleted');

        const index = this.audioFiles.findIndex(x => x.id === id);

         this.audioFiles.splice(index);

         if (this.audioFiles.length < 1) {
           this.hasFile = false;
         }

      }
    );

  }

  /* To copy any Text */
  copy(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.alertify.success('Copied to the clipboard');
  }



}
