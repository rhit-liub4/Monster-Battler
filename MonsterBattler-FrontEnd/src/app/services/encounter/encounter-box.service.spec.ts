import { TestBed } from '@angular/core/testing';

import { EncounterBoxService } from './encounter-box.service';

describe('EncounterBoxService', () => {
  let service: EncounterBoxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncounterBoxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
