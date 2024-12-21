import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectListExampleComponent } from './select-list-example.component';

describe('SelectListExampleComponent', () => {
  let component: SelectListExampleComponent;
  let fixture: ComponentFixture<SelectListExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectListExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectListExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
