import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LemexeLoadPageComponent } from './lemexe-load-page.component';

describe('LemexeLoadPageComponent', () => {
  let component: LemexeLoadPageComponent;
  let fixture: ComponentFixture<LemexeLoadPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LemexeLoadPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LemexeLoadPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
