import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { DistrictDialogComponent } from '../districtDialog/districtDialog.component';
import { State } from '../models/state.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  stateData: State[] = [];
  total: State;

  displayedColumns: string[] = ['state', 'total', 'active', 'recovered', 'deceased'];
  dataSource: MatTableDataSource<State>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.dataService.fetchStateData().subscribe(res => {
      if (res && res.statewise) {
        this.stateData = res.statewise.splice(1);
        this.total = res.statewise[0];
        this.dataSource = new MatTableDataSource(this.stateData);
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

  openDialog(stateData: State) {
    this.dialog.open(DistrictDialogComponent, {
      data: stateData
    });
  }
}
