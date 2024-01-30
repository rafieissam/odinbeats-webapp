import { TestBed } from '@angular/core/testing';

import { UserPlaylistsApiService } from './user-playlists-api.service';

describe('UserPlaylistsApiService', () => {
  let service: UserPlaylistsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserPlaylistsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
