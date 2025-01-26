import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadLexemesFilePageComponent } from './upload-lexemes-file-page.component';

describe('UploadLexemesFilePageComponent', () => {
  let component: UploadLexemesFilePageComponent;
  let fixture: ComponentFixture<UploadLexemesFilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadLexemesFilePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadLexemesFilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
