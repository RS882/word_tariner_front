import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadNewLexemePageComponent } from './upload-new-lexeme-page.component';

describe('LoadNewLexemePageComponent', () => {
  let component: UploadNewLexemePageComponent;
  let fixture: ComponentFixture<UploadNewLexemePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadNewLexemePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadNewLexemePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
