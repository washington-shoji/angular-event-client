import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicLayoutScreenComponent } from './public-layout-screen.component';

describe('PublicLayoutScreenComponent', () => {
  let component: PublicLayoutScreenComponent;
  let fixture: ComponentFixture<PublicLayoutScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicLayoutScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicLayoutScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
