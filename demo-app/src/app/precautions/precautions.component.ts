import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditPrecautionComponent } from './add-edit-precaution/add-edit-precaution.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { Precaution } from '../models/precaution.model';

@Component({
  selector: 'app-precautions',
  templateUrl: './precautions.component.html',
  styleUrls: ['./precautions.component.css']
})
export class PrecautionsComponent implements OnInit {

  isAdmin: boolean;
  precautions: Precaution[] = [];

  constructor(
    private dialog: MatDialog,
    private dataService: DataService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.authService.isLoggedIn.subscribe(isLoggedIn => {
      this.isAdmin = isLoggedIn;
    });
    this.getPrecautionApiCall();
  }

  openPrecautionForm() {
    const dialofRef = this.dialog.open(AddEditPrecautionComponent, {
      data: {
        mode: 'add',
        listTotal: this.precautions.length
      }
    });

    dialofRef.afterClosed().subscribe(res => {
      this.getPrecautionApiCall();
    });
  }


  editPrecaution(precaution: Precaution) {
    const dialofRef = this.dialog.open(AddEditPrecautionComponent, {
      data: {
        ...precaution,
        mode: 'edit'
      }
    });

    dialofRef.afterClosed().subscribe(res => {
      this.getPrecautionApiCall();
    });
  }

  deletePrecaution(id: number) {
    this.dataService.deletePrecaution(id).subscribe(res => {
      this.precautions = this.precautions.filter(precaution => precaution.id !== id);
    });
  }

  getPrecautionApiCall() {
    this.dataService.getPrecautions().subscribe(precautions => {
      if (precautions) {
        this.precautions = precautions;
      }
      else {
        this.snackBar.open('No Precautions !', 'OK', { duration: 2000 });
      }
    });
  }

}
