import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { NewsComponent } from './news.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import {MatDialogModule} from '@angular/material/dialog';
import { OVERLAY_PROVIDERS } from '@angular/cdk/overlay';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs/internal/observable/of';
import { News } from '../models/news.model';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;
  let dialogSpy: jasmine.Spy;
  let dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of({}), close: null });
  dialogRefSpyObj.componentInstance = { body: '' };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsComponent ],
      imports: [MatDialogModule , HttpClientTestingModule, BrowserAnimationsModule],
      providers: [DataService, MatSnackBar, AuthService, MatDialog, OVERLAY_PROVIDERS]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
    dialogSpy = spyOn(TestBed.get(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
    fixture.detectChanges();
  });

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show add news button if user is logged in', () => {

  });

  /* it('should use the news from the data service', () => {
     const app = fixture.debugElement.componentInstance;
     const dataService = fixture.debugElement.injector.get(DataService);
     const latestNews: News = {id: 1, title: 'COVID NEWS', description: 'The situation is getting better in India', url: 'https://www.livemint.com/news/india/coronavirus-update-covid-19-cases-in-india-cross-35-000-death-toll-at-1-147-state-wise-tally-11588301509527.html', date: new Date()};
     app.news = latestNews;
     dataService.getNews().subscribe((receivedNews: News) => expect(receivedNews).toBe(latestNews));
    });

  it('expects service to fetch data',
  inject([HttpTestingController, DataService],
    (httpMock: HttpTestingController, service: DataService) => {
      // We call the service
      service.getNews().subscribe(data => {
        expect(data.title).toBe('COVID NEWS');
        expect(data.description).toBe('The situation is getting better in India');
        expect(data.url).toBe('https://www.livemint.com/news/india/coronavirus-update-covid-19-cases-in-india-cross-35-000-death-toll-at-1-147-state-wise-tally-11588301509527.html');
        expect(data.length).toBe(1);
      });
      // We set the expectations for the HttpClient mock
      const req = httpMock.match({ method: 'GET', url: 'api/news' });
      const latestNews: News = {id: 1, title: 'COVID NEWS', description: 'The situation is getting better in India', url: 'https://www.livemint.com/news/india/coronavirus-update-covid-19-cases-in-india-cross-35-000-death-toll-at-1-147-state-wise-tally-11588301509527.html', date: new Date()};
    })
); */
});
