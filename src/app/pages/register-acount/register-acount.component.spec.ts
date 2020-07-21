import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAcountComponent } from './register-acount.component';

describe('RegisterAcountComponent', () => {
  let component: RegisterAcountComponent;
  let fixture: ComponentFixture<RegisterAcountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterAcountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterAcountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
