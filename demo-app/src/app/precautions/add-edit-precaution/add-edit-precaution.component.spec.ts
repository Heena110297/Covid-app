import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditPrecautionComponent} from '../add-edit-precaution/add-edit-precaution.component';
import { DataService } from 'src/app/services/data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';

describe('AddEditPrecautionComponent', () => {
  let component: AddEditPrecautionComponent;
  let fixture: ComponentFixture<AddEditPrecautionComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditPrecautionComponent ],
      imports: [HttpClientModule],
      providers: [DataService, {
        provide: MatDialogRef,
        useValue: mockDialogRef
      }, { provide: MAT_DIALOG_DATA, useValue: {} }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditPrecautionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
