import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../services/shared.module";
import {UsersComponent} from "./users/users.component";
import {FormsModule} from "@angular/forms";
import {ChatCenterComponent} from "./chat-center/chat-center.component";
import {ChatsRoutingModule} from "./chats-routing.module";

@NgModule({
  declarations: [
    UsersComponent,
    ChatCenterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ChatsRoutingModule
  ],
  exports: [
  ]
})
export class ChatsModule { }
