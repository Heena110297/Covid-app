import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { RequestInfo } from 'angular-in-memory-web-api/interfaces'

import { News } from '../models/news.model';
import { Precaution } from '../models/precaution.model';

const users = [
  { id: 1, email: 'admin@xyz.com', password: '123456' }
];


@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const precautions: Precaution[] = [
      { id: 1, precaution: 'Clean your hands often. Use soap and water, or an alcohol-based hand rub.' },
      { id: 2, precaution: 'Maintain a safe distance from anyone who is coughing or sneezing.' },
      { id: 3, precaution: 'Don’t touch your eyes, nose or mouth.' },
      { id: 4, precaution: 'Cover your nose and mouth with your bent elbow or a tissue when you cough or sneeze.' },
      { id: 5, precaution: 'Stay home if you feel unwell.' },
      { id: 6, precaution: 'If you have a fever, a cough, and difficulty breathing, seek medical attention. Call in advance.' },
      { id: 7, precaution: 'Follow the directions of your local health authority.' }
    ];

    const news: News[] = [
      {
        id: 1,
        title: 'COVID NEWS',
        description: 'Coronavirus update: COVID-19 cases in India cross 35,000, death toll at 1,147. State-wise tally India crossed the grim milestone of 35,000 coronavirus cases as the states registered another record hike in patients. A staggering 1,993 new cases were recorded in last 24 hours. The total number of coronavirus patients in India climbed to 35,043, according to ministry of health and family welfare.',
        url: 'https://www.livemint.com/news/india/coronavirus-update-covid-19-cases-in-india-cross-35-000-death-toll-at-1-147-state-wise-tally-11588301509527.html',
        date: new Date('2020-05-01T18:30:00.000Z')
      },
      {
        id: 2,
        title: 'Noida: Nearly 1,200 stranded students leave for home amid lockdown',
        description: 'Nearly 1,200 students from various colleges and universities across Noida and Greater Noida on Sunday left for their homes on specially-arranged buses amid the COVID-19 lockdown, officials said. Fifty-one buses were arranged by the Gautam Buddh Nagar administration to send the stranded students back to their homes as per directions from the Uttar Pradesh government, the officials said.',
        url: 'https://economictimes.indiatimes.com/news/politics-and-nation/coronavirus-cases-in-india-live-news-latest-updates-may3/liveblog/75513322.cms',
        date: new Date('2020-05-01T18:30:00.000Z')
      }
    ];
    return { users, precautions, news };
  }


  // HTTP POST interceptor
  post(reqInfo: RequestInfo) {

    // if client pinged api/users
    //  then call users (defined below)
    if (reqInfo.collectionName === 'users') {
      return this.authenticate(reqInfo);
    }

    //  otherwise default response of In-memory DB
    return undefined;

  }

  // mocking authentication happens here
  // HTTP POST interceptor handler
  private authenticate(reqInfo: RequestInfo) {

    // return an Observable response
    return reqInfo.utils.createResponse$(() => {

      const { headers, url, req } = reqInfo;

      // if request username and passord are correct
      //  return response with a JSONWebToken
      const { email, password } = req['body'];
      const user = users.find(x => x.email === email && x.password === password);
      if (user) {
        return {
          status: 200,
          headers, // reqInfo (line 30)
          url, // reqInfo (line 30)
          body: {
            email: user.email,
            isAdmin: true,
            token: 'fake-jwt-token',
          }
        };
      }

      //  otherwise return response with status code 401 (unauthorized)
      return {
        status: 401,
        headers,
        url,
        body: {}
      };
    });
  }

}
