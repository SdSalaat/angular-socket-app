import {Component, ElementRef, Input, OnInit, ViewChild, AfterViewChecked} from '@angular/core';
import {ChatsRouterService} from '../chats-router.service';
import {Socket} from 'ngx-socket-io';

@Component({
  selector: 'app-chat-center',
  templateUrl: './chat-center.component.html',
  styleUrls: ['./chat-center.component.scss']
})
export class ChatCenterComponent implements OnInit {
  @ViewChild('displayWindow') myScrollContainer: ElementRef;
  user: any = {};
  message = '';
  spinner = false;
  chats: any[] = [];
  activeUser = JSON.parse(localStorage.getItem('activeUser'));
  constructor(
    private chatService: ChatsRouterService,
    private socket: Socket
  ) { }

  ngOnInit() {
    this.scrollToBottom();
    this.socket.on('rec-message', (data) => {
      this.message  = '';
      this.spinner = false;
      this.activeUser = JSON.parse(localStorage.getItem('activeUser'));
      if (data.chats.length > 0) {
        this.chats = [];
        this.chats = data.chats;
        this.scrollToBottom();
      }
    });
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  @Input('selectedUser')
  set selectedUser(data: any) {
    console.log(data);
    if (Object.keys(data).length > 0) {
      this.user = data;
      this.activeUser = JSON.parse(localStorage.getItem('activeUser'));
      const payload = {
        senderID: this.activeUser._id,
        receiverID: this.user._id
      };
      this.chatService.userChats(payload)
        .subscribe(messages => {
          if (messages.userChats.length > 0) {
            this.chats = messages.userChats;
          }
        });
    }
  }

  sendMessage() {
    this.spinner = true;
    this.activeUser = JSON.parse(localStorage.getItem('activeUser'));
    const payload = {
      senderID: this.activeUser._id,
      receiverID: this.user._id,
      message: this.message
    };
    this.socket.emit('sending-message', payload);
  }


  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

}
