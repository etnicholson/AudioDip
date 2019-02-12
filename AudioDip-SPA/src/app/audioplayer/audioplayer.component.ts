import { Component, OnInit, OnDestroy } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import { Router, ActivatedRoute} from '@angular/router';
import { FileService } from '../_services/file.service';
import { AudioFile } from '../_models/audioFile';
import { environment } from 'src/environments/environment';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-audioplayer',
  templateUrl: './audioplayer.component.html',
  styleUrls: ['./audioplayer.component.css']
})
export class AudioplayerComponent implements OnInit, OnDestroy {
  wavesurfer: any;
  id: number;
  audioFile: AudioFile;
  uploadFolder = environment.uploadFolder;
  constructor(private route: ActivatedRoute, private fileService: FileService) { }

  ngOnInit() {
      this.wavesurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: 'black',
      progressColor: 'white'
  });
   this.id = this.route.snapshot.params.id;

   this.fileService.getAudio(this.id).subscribe(
    (res: any) => {
      this.audioFile = res;
      this.wavesurfer.load(this.uploadFolder + this.audioFile.fileName);

    }
  );



  }

  ngOnDestroy() {

    this.wavesurfer.pause();

  }

  playMusic() {
    this.wavesurfer.play();

  }

  stopMusic() {
    this.wavesurfer.pause();

  }

}
