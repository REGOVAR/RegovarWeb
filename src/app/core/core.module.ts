import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './services/authentication.service';
import { AlertComponent } from './components/alert/alert.component';


@NgModule({
  declarations: [AlertComponent],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
