import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedSongsSectionComponent } from './liked-songs-section.component';

describe('LikedSongsSectionComponent', () => {
  let component: LikedSongsSectionComponent;
  let fixture: ComponentFixture<LikedSongsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LikedSongsSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LikedSongsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
