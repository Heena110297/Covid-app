import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OVERLAY_PROVIDERS } from '@angular/cdk/overlay';
import { AuthService } from './services/auth.service';

describe('AppComponent', () => {
  let component: AppComponent; // we're going to test this component
  let fixture: ComponentFixture<AppComponent>; // used for debugging and testing the component
  // for configurations , fetching url is asynchronous
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [HttpClientModule],
      providers: [AuthService, MatSnackBar, OVERLAY_PROVIDERS]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'demo-app'`, () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('demo-app');
  });

});
