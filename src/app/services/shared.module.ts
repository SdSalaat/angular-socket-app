import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import {FormsModule} from '@angular/forms';
import { environment } from '../../environments/environment';

const config: SocketIoConfig = { url: environment.baseURL, options: {} };
// const config: SocketIoConfig = { url: 'https://ng-socket-server.herokuapp.com', options: {} };

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    FormsModule
  ]
})
export class SharedModule { }
