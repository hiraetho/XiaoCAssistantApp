import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtlPage } from './dtl.page';

describe('DtlPage', () => {
  let component: DtlPage;
  let fixture: ComponentFixture<DtlPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtlPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtlPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
