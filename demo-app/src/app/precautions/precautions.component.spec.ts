import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OVERLAY_PROVIDERS } from '@angular/cdk/overlay';
import { PrecautionsComponent } from './precautions.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { HttpClientModule } from '@angular/common/http';


describe('PrecautionsComponent', () => {
  let component: PrecautionsComponent;
  let fixture: ComponentFixture<PrecautionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrecautionsComponent ],
      imports: [MatDialogModule, HttpClientModule],
      providers: [MatDialog, OVERLAY_PROVIDERS, MatSnackBar, AuthService, DataService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecautionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
