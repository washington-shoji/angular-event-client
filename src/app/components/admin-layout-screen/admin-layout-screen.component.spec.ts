import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLayoutScreenComponent } from './admin-layout-screen.component';

describe('AdminLayoutScreenComponent', () => {
  let component: AdminLayoutScreenComponent;
  let fixture: ComponentFixture<AdminLayoutScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminLayoutScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminLayoutScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
