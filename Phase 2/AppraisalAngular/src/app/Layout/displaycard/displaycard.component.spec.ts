import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaycardComponent } from './displaycard.component';

describe('DisplaycardComponent', () => {
  let component: DisplaycardComponent;
  let fixture: ComponentFixture<DisplaycardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplaycardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaycardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
