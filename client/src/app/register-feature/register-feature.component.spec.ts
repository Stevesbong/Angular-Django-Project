import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFeatureComponent } from './register-feature.component';

describe('RegisterFeatureComponent', () => {
  let component: RegisterFeatureComponent;
  let fixture: ComponentFixture<RegisterFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterFeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
