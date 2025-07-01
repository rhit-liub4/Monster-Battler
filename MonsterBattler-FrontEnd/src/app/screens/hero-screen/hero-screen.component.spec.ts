import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroScreenComponent } from './hero-screen.component';

describe('HeroScreenComponent', () => {
  let component: HeroScreenComponent;
  let fixture: ComponentFixture<HeroScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
