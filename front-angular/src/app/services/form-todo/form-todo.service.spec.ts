import { TestBed } from '@angular/core/testing';

import { FormTodoService } from './form-todo.service';

describe('FormTodoService', () => {
  let service: FormTodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormTodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
