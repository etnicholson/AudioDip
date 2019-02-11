import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UploadfileComponent } from './uploadfile/uploadfile.component';
import { AuthGuard } from './_guards/auth.guard';
import { UserpanelComponent } from './userpanel/userpanel.component';
import { AudioplayerComponent } from './audioplayer/audioplayer.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent },
  {path: 'player/:id', component: AudioplayerComponent },
  {path: 'upload', component: UploadfileComponent, canActivate: [AuthGuard] },
  {path: 'userPanel', component: UserpanelComponent, canActivate: [AuthGuard] },

  {path: '**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
