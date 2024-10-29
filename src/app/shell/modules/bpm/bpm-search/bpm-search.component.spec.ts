import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BpmSearchComponent } from './bpm-search.component';

describe('BpmSearchComponent', () => {
  let component: BpmSearchComponent;
  let fixture: ComponentFixture<BpmSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BpmSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BpmSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
