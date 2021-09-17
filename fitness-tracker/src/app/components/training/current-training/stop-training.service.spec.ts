import { TestBed } from '@angular/core/testing';

import { StopTrainingService } from './stop-training.service';

describe('StopTrainingService', () => {
  let service: StopTrainingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StopTrainingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
