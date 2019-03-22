import { TestBed } from '@angular/core/testing';

import { ChatsRouterService } from './chats-router.service';

describe('ChatsRouterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatsRouterService = TestBed.get(ChatsRouterService);
    expect(service).toBeTruthy();
  });
});
