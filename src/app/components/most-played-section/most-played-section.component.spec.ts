import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostPlayedSectionComponent } from './most-played-section.component';

describe('MostPlayedSectionComponent', () => {
  let component: MostPlayedSectionComponent;
  let fixture: ComponentFixture<MostPlayedSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostPlayedSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostPlayedSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
