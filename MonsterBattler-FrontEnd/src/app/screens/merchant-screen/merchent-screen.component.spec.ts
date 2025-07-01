import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchentScreenComponent } from './merchent-screen.component';

describe('MerchentScreenComponent', () => {
  let component: MerchentScreenComponent;
  let fixture: ComponentFixture<MerchentScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MerchentScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchentScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
