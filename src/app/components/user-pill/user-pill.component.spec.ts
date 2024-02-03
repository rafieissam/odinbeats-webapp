import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPillComponent } from './user-pill.component';

describe('UserPillComponent', () => {
  let component: UserPillComponent;
  let fixture: ComponentFixture<UserPillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPillComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserPillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
