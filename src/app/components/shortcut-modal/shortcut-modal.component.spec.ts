import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortcutModalComponent } from './shortcut-modal.component';

describe('ShortcutModalComponent', () => {
  let component: ShortcutModalComponent;
  let fixture: ComponentFixture<ShortcutModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShortcutModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShortcutModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
