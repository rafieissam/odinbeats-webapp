import { TestBed } from '@angular/core/testing';

import { SongsApiService } from './songs-api.service';

describe('SongsApiService', () => {
  let service: SongsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SongsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
