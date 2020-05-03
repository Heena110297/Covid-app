import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { MyErrorStateMatcher } from 'src/app/my-error-state-matcher';

@Component({
  selector: 'app-add-edit-news',
  templateUrl: './add-edit-news.component.html',
  styleUrls: ['./add-edit-news.component.css']
})
export class AddEditNewsComponent implements OnInit {

  newsForm = new FormGroup({
    title: new FormControl(null, Validators.required),
    description: new FormControl(null, [Validators.required, Validators.minLength(50)]),
    url: new FormControl(null, [Validators.required, Validators.pattern('https?://.+')]),
    date: new FormControl(new Date(), Validators.required)
  });

  minDate = new Date();
  matcher = new MyErrorStateMatcher();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddEditNewsComponent>,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    if (this.data.mode === 'edit') {
      this.dataService.getNewsById(this.data.id).subscribe(res => {
        this.newsForm.patchValue(res);
      });
    }
  }

  newsOps() {
    if (this.newsForm.valid) {
      if (this.data.mode === 'add') {
        const newsObj = {
          id: this.data.listTotal + 1,
          ...this.newsForm.value
        };
        this.dataService.addNews(newsObj).subscribe(res => {
          this.dialogRef.close();
        });
      }
      else {
        const newsObj = {
          id: this.data.id,
          ...this.newsForm.value
        };
        this.dataService.updateNews(this.data.id, newsObj).subscribe(res => {
          this.dialogRef.close();
        });
      }
    }
  }

  getErrorMessageForDescription() {
    if (this.newsForm.get('description').hasError('required')) {
      return 'Description is required';
    }
    return this.newsForm.get('description').hasError('minlength') ? 'Minimum length should be 50' : '';
  }

  getErrorMessageForDate() {
    if (this.newsForm.get('date').hasError('required')) {
      return 'Date is required';
    }
    if (this.minDate > new Date(this.newsForm.get('date').value)) {
      return 'Please enter latest news';
    }
    return '';
  }

  getErrorMessageForUrl() {
    if (this.newsForm.get('url').hasError('required')) {
      return 'Source link of the news is required';
    }
    return this.newsForm.get('url').hasError('pattern') ? 'Please enter a valid url.' : '';
  }
}
