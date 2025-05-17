/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ManagmentBooksComponent } from './managment-books.component';

describe('ManagmentBooksComponent', () => {
  let component: ManagmentBooksComponent;
  let fixture: ComponentFixture<ManagmentBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagmentBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagmentBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
