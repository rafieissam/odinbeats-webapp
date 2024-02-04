import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongSearcherComponent } from './song-searcher.component';

describe('SongSearcherComponent', () => {
  let component: SongSearcherComponent;
  let fixture: ComponentFixture<SongSearcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongSearcherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SongSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
