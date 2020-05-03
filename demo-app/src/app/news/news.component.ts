import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditNewsComponent } from './add-edit-news/add-edit-news.component';
import { DataService } from '../services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { News } from '../models/news.model';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  isAdmin: boolean;
  news: News[] = [];

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private dataService: DataService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe(isLoggedIn => {
      this.isAdmin = isLoggedIn;
    });
    this.getNewsApiCall();
  }

  onAddNews() {
    const dialofRef = this.dialog.open(AddEditNewsComponent, {
      data: {
        mode: 'add',
        listTotal: this.news.length
      }
    });

    dialofRef.afterClosed().subscribe(res => {
      this.getNewsApiCall();
    });
  }

  onEditNews(id: number) {
    const dialofRef = this.dialog.open(AddEditNewsComponent, {
      data: {
        id,
        mode: 'edit'
      }
    });

    dialofRef.afterClosed().subscribe(res => {
      this.getNewsApiCall();
    });
  }

  onDeleteNews(id: number) {
    this.dataService.deleteNews(id).subscribe(res => {
      this.news = this.news.filter(newsItem => newsItem.id !== id);
    });
  }

  getNewsApiCall() {
    this.dataService.getNews().subscribe(news => {
      if (news) {
        this.news = news;
      }
      else {
        this.snackBar.open('No News !', 'OK', { duration: 2000 });
      }
    });
  }
}
