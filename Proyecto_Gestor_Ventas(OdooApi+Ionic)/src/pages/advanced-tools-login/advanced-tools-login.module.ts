import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdvancedToolsLoginPage } from './advanced-tools-login';
import { LoginPage } from '../login/login';

@NgModule({
  declarations: [
    AdvancedToolsLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
  ],
})
export class AdvancedToolsLoginPageModule {}
