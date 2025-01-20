import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSaveResultComponent } from './modal-save-result.component';

describe('ModalSaveResultComponent', () => {
  let component: ModalSaveResultComponent;
  let fixture: ComponentFixture<ModalSaveResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalSaveResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalSaveResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
