import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AddEditNewsComponent } from './add-edit-news.component';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';

describe('AddEditNewsComponent', () => {
  let component: AddEditNewsComponent;
  let fixture: ComponentFixture<AddEditNewsComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditNewsComponent ],
      imports: [HttpClientModule],
      providers: [ DataService, MatDialog, { provide: MAT_DIALOG_DATA, useValue: {} }, {
        provide: MatDialogRef,
        useValue: mockDialogRef
      } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
