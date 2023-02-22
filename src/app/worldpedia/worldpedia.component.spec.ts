import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldpediaComponent } from './worldpedia.component';

describe('WorldpediaComponent', () => {
  let component: WorldpediaComponent;
  let fixture: ComponentFixture<WorldpediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorldpediaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorldpediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
