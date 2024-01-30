import { TestBed } from '@angular/core/testing';

import { UserSongsApiService } from './user-songs-api.service';

describe('UserSongsApiService', () => {
  let service: UserSongsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSongsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
