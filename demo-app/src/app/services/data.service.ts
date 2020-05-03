import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Precaution } from '../models/precaution.model';
import { News } from '../models/news.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  BACKEND_URL = 'api';
  STATE_DATA_API_URL = 'https://api.covid19india.org/data.json';
  DISTRICT_DATA_API_URL = 'https://api.covid19india.org/state_district_wise.json';

  constructor(private http: HttpClient) { }

  fetchStateData() {
    return this.http.get<any>(`${this.STATE_DATA_API_URL}`);
  }

  fetchDistrictData() {
    return this.http.get<any>(`${this.DISTRICT_DATA_API_URL}`);
  }

  getNews() {
    return this.http.get<News[]>(`${this.BACKEND_URL}/news`);
  }

  getNewsById(id: number) {
    return this.http.get<News>(`${this.BACKEND_URL}/news/${id}`);
  }

  addNews(newsObj) {
    return this.http.post<News>(`${this.BACKEND_URL}/news`, newsObj);
  }

  updateNews(id: number, newsObj) {
    return this.http.put<News>(`${this.BACKEND_URL}/news/${id}`, newsObj);
  }

  deleteNews(id: number) {
    return this.http.delete<News>(`${this.BACKEND_URL}/news/${id}`);
  }

  getPrecautions() {
    return this.http.get<Precaution[]>(`${this.BACKEND_URL}/precautions`);
  }

  addPrecaution(precautionObj) {
    return this.http.post<Precaution>(`${this.BACKEND_URL}/precautions`, precautionObj);
  }

  updatePrecaution(id: number, precautionObj) {
    return this.http.put<Precaution>(`${this.BACKEND_URL}/precautions/${id}`, precautionObj);
  }

  deletePrecaution(id: number) {
    return this.http.delete<Precaution>(`${this.BACKEND_URL}/precautions/${id}`);
  }
}
