import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicEventPageComponent } from './public-event-page.component';

describe('PublicEventPageComponent', () => {
  let component: PublicEventPageComponent;
  let fixture: ComponentFixture<PublicEventPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicEventPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicEventPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
