import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameassignComponent } from './gameassign.component';

describe('GameassignComponent', () => {
  let component: GameassignComponent;
  let fixture: ComponentFixture<GameassignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameassignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameassignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
