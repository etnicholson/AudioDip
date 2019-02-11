import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';





import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadfileComponent } from './uploadfile/uploadfile.component';
import { UploadService } from './_services/upload.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AudioplayerComponent } from './audioplayer/audioplayer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { UserpanelComponent } from './userpanel/userpanel.component';
import { AuthGuard } from './_guards/auth.guard';
import { FileService } from './_services/file.service';
import { AlertifyService } from './_services/alertify.service';

@NgModule({
   declarations: [
      AppComponent,
      UploadfileComponent,
      AudioplayerComponent,
      NavbarComponent,
      LoginComponent,
      RegisterComponent,
      HomeComponent,
      UserpanelComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      BrowserAnimationsModule,
      MatMenuModule,
      MatIconModule,
      MatGridListModule,
      MatFormFieldModule,
      FormsModule,
      MatInputModule,
      MatProgressBarModule,
      MatCardModule,
      MatButtonModule
   ],
   providers: [
      UploadService,
      AuthGuard,
      FileService,
      AlertifyService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
