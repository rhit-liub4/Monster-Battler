import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampScreenComponent } from './camp-screen.component';

describe('CampScreenComponent', () => {
  let component: CampScreenComponent;
  let fixture: ComponentFixture<CampScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
