import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminExperimentalComponent } from './admin-experimental.component';

describe('AdminExperimentalComponent', () => {
  let component: AdminExperimentalComponent;
  let fixture: ComponentFixture<AdminExperimentalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminExperimentalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminExperimentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
