import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { State } from '../models/state.model';
import { DataService } from './data.service';
import { District } from '../models/district.model';
import { News } from '../models/news.model';
import { Precaution } from '../models/precaution.model';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
    });
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all the states',
  inject ([HttpTestingController],
    (httpMock: HttpTestingController) => {
      service.fetchStateData().subscribe((data: State[]) => {
        expect(data.length).toBe(38);
      });
      const mockRequest = httpMock.expectOne(service.STATE_DATA_API_URL);
      expect(mockRequest.request.method).toEqual('GET');
    })
  );

  it('should return all the districts',
  inject ([HttpTestingController],
    (httpMock: HttpTestingController) => {
      service.fetchDistrictData().subscribe((data: District[]) => {
        expect(data.length).toBe(38);
      });
      const mockRequest = httpMock.expectOne(service.DISTRICT_DATA_API_URL);
      expect(mockRequest.request.method).toEqual('GET');
    })
  );

  it('should return all the news in-memory',
  inject ([HttpTestingController],
    (httpMock: HttpTestingController) => {
      service.getNews().subscribe((data: News[]) => {
        expect(data.length).toBe(1);
      });
      const mockRequest = httpMock.expectOne(`${service.BACKEND_URL}/news`);
      expect(mockRequest.request.method).toEqual('GET');
    })
  );

  it('should return all the precautions in-memory',
  inject ([HttpTestingController],
    (httpMock: HttpTestingController) => {
      service.getPrecautions().subscribe((data: Precaution[]) => {
        expect(data.length).toBe(7);
      });
      const mockRequest = httpMock.expectOne(`${service.BACKEND_URL}/precautions`);
      expect(mockRequest.request.method).toEqual('GET');
    })
  );

});
