import { TestBed } from '@angular/core/testing';

import { NewPeopleGuard } from './new-people.guard';

describe('NewPeopleGuard', () => {
  let guard: NewPeopleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NewPeopleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
