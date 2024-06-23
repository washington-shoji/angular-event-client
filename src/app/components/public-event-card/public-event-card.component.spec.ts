import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicEventCardComponent } from './public-event-card.component';

describe('PublicEventCardComponent', () => {
  let component: PublicEventCardComponent;
  let fixture: ComponentFixture<PublicEventCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicEventCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicEventCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
