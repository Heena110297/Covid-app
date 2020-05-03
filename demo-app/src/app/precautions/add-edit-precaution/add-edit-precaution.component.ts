import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-edit-precaution',
  templateUrl: './add-edit-precaution.component.html',
  styleUrls: ['./add-edit-precaution.component.css']
})
export class AddEditPrecautionComponent implements OnInit {

  precaution = new FormControl('', Validators.required);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddEditPrecautionComponent>,
    private dataService: DataService,
  ) { }

  ngOnInit() {
    if (this.data.mode === 'edit') {
      this.precaution.setValue(this.data.precaution);
    }
  }

  precautionOps(precaution: string) {
    if (this.precaution.valid) {
      if (this.data.mode === 'add') {
        const precautionObj = {
          id: this.data.listTotal + 1,
          precaution
        };
        this.dataService.addPrecaution(precautionObj).subscribe(res => {
          this.dialogRef.close();
        });
      }
      else {
        const precautionObj = {
          id: this.data.id,
          precaution
        };
        this.dataService.updatePrecaution(this.data.id, precautionObj).subscribe(res => {
          this.dialogRef.close();
        });
      }
    }
  }
}
