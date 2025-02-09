import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationsResultComponent } from './translations-result.component';

describe('TranslationsResultComponent', () => {
  let component: TranslationsResultComponent;
  let fixture: ComponentFixture<TranslationsResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslationsResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranslationsResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
