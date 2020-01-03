import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraisallogComponent } from './appraisallog.component';

describe('AppraisallogComponent', () => {
  let component: AppraisallogComponent;
  let fixture: ComponentFixture<AppraisallogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppraisallogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppraisallogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
