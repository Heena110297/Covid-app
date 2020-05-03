import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OVERLAY_PROVIDERS } from '@angular/cdk/overlay';
import { HeaderComponent } from './header.component';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatMenu, MatMenuModule } from '@angular/material/menu';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [HttpClientModule, MatDialogModule, MatMenuModule],
      providers: [AuthService, MatSnackBar, MatDialog, MatMenu, OVERLAY_PROVIDERS]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get token value from local storage', () => {
    const adminInfo = {
      email: 'admin@xyz.com',
      token : 'fake-jwt-token',
      isAdmin: true
    };
    window.localStorage.setItem('adminInfo', JSON.stringify(adminInfo));

    component.ngOnInit();
    expect(component.isAdmin).toEqual(true);
  });
});
