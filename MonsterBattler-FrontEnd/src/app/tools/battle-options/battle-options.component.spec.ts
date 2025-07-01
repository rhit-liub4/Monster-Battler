import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleOptionsComponent } from './battle-options.component';

describe('BattleOptionsComponent', () => {
  let component: BattleOptionsComponent;
  let fixture: ComponentFixture<BattleOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BattleOptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BattleOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
