import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatCenterComponent } from './chat-center.component';

describe('ChatCenterComponent', () => {
  let component: ChatCenterComponent;
  let fixture: ComponentFixture<ChatCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
