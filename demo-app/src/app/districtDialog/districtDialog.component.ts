import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../services/data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { State } from '../models/state.model';
import { District } from '../models/district.model';

export interface DialogData {
  stateName: string;
}

@Component({
  selector: 'app-district-dialog',
  templateUrl: './districtDialog.component.html',
  styleUrls: ['./districtDialog.component.css']
})
export class DistrictDialogComponent implements OnInit {

  displayedColumns: string[] = ['district', 'total', 'active', 'recovered', 'deceased'];
  dataSource: MatTableDataSource<District>;
  districtData = [];
  formattedDistrictData: District[] = [];

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private dataService: DataService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: State
  ) { }

  ngOnInit(): void {
    this.dataService.fetchDistrictData().subscribe(res => {
      if (res && res[this.data.state]) {
        this.districtData = res[this.data.state].districtData;
        for (const key in this.districtData) {
          if (key) {
            this.districtData[key]['district'] = key;
            this.formattedDistrictData.push(this.districtData[key]);
          }
        }
        this.dataSource = new MatTableDataSource(this.formattedDistrictData);
        this.dataSource.sort = this.sort;
      }
      else {
        this.snackBar.open('No Data !', 'OK', { duration: 2000 });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
