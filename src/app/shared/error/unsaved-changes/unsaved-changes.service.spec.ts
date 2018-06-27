import { TestBed, inject } from '@angular/core/testing';

import { UnsavedChangesService } from './unsaved-changes.service';

describe('UnsavedChangesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnsavedChangesService]
    });
  });

  it('should be created', inject([UnsavedChangesService], (service: UnsavedChangesService) => {
    expect(service).toBeTruthy();
  }));
});
