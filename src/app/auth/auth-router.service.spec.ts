import { TestBed } from '@angular/core/testing';

import { AuthRouterService } from './auth-router.service';

describe('AuthRouterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthRouterService = TestBed.get(AuthRouterService);
    expect(service).toBeTruthy();
  });
});
