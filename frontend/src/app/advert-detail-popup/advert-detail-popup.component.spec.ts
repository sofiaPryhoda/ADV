import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertDetailPopupComponent } from './advert-detail-popup.component';

describe('AdvertDetailPopupComponent', () => {
  let component: AdvertDetailPopupComponent;
  let fixture: ComponentFixture<AdvertDetailPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertDetailPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertDetailPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
