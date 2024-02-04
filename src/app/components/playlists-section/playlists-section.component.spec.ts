import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistsSectionComponent } from './playlists-section.component';

describe('PlaylistsSectionComponent', () => {
  let component: PlaylistsSectionComponent;
  let fixture: ComponentFixture<PlaylistsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistsSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlaylistsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
