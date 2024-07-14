import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateEventCardComponent } from './private-event-card.component';

describe('PrivateEventCardComponent', () => {
  let component: PrivateEventCardComponent;
  let fixture: ComponentFixture<PrivateEventCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivateEventCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrivateEventCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
