import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getLocalStorage } from '../app.module';

import { GoComponent } from './go.component';

describe('GoComponent', () => {
  let component: GoComponent;
  let fixture: ComponentFixture<GoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoComponent ],
      providers: [
        GoComponent,
        { provide: 'LOCALSTORAGE', useFactory: getLocalStorage }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
